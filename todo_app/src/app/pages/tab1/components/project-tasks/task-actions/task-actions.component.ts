import { Component, OnInit } from '@angular/core';
import { Task } from '../../../../../shared/models/task';
import { RestService } from '../../../../../shared/services/rest.service';
import { FormControl } from '@angular/forms';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { LoadingService } from '../../../../../shared/services/loading.service';
import { ToastService } from '../../../../../shared/services/toast.service';

@Component({
  selector: 'app-task-actions',
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.scss'],
})
export class TaskActionsComponent implements OnInit {

  todo: Task[];

  advance = new FormControl();

  constructor(
    private rest: RestService,
    private modalCtrl: ModalController,
    private loading: LoadingService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.loadTodo();
  }

  loadTodo() {
    this.rest.get('tasks/assigned').subscribe((todo: Task[]) => {
      this.todo = todo.filter(t => t.advance < 100);
    },(e) => { console.error('Problemas con la consulta', e) });
  }

  async done(task: Task) {
    this.loading.presentLoading('Registrando avance');
    try {
      const now =  new Date().getTime();
      if (this.advance.value) {
        task.advance = this.advance.value;

        if (this.advance.value === 100) {
          let start = moment(task.startDate);
          let finish = moment(now);
          let duration = moment.duration(start.diff(finish)).locale('es').humanize();

          task.finishDate = now;
          task.updateDate = now;
          task.time = duration;
        }

        let response = await this.rest.update(`tasks/${task.id}`, task).toPromise();

        if (response) {
          setTimeout(() => {
            this.loadTodo();
          }, 1000);
        }
        this.advance.reset();
        this.toast.simpleToast('Tarea actualizada', 'primary');
      }
    } catch(e) {
      this.toast.simpleToast('No se pudo actualizar', 'danger');
    }

  }

  async taskDetails(task: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskDetailsComponent,
      componentProps: { task }
    });
    await modal.present();

    let response = await modal.onDidDismiss();
    if (response) this.loadTodo();
  }
}
