import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertControlService } from 'src/app/shared/services/alert-control.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Task, User } from '../../../../../shared/models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));
  @Input() task: Task;

  constructor(
    private modalCtrl: ModalController,
    private rest: RestService,
    private toast: ToastService,
    private alertControlService: AlertControlService,
    private loading: LoadingService,
  ) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  delete() {
    const handler = async () => {
      try {
        const path = `tasks/${this.task.id}`;
        this.rest.delete(path).subscribe(response => console.log(response));
        this.toast.simpleToast('tarea eliminada', 'primary');
        this.modalCtrl.dismiss(true);
      } catch(e) {
        this.toast.simpleToast('No se pudo eliminar la tarea, por favor intente de nuevo', 'danger');
      }
    }

    this.alertControlService.showAlert(
      'Eliminar',
      `¿Está seguro de eliminar definitivamente la tarea?`,
      'Cancelar',
      'Confirmar',
      handler
    );
  }

}
