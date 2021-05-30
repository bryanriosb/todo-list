import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../../../shared/models/task';
import { Project } from '../../../../shared/models/project';
import { ModalController } from '@ionic/angular';
import { AlertControlService } from 'src/app/shared/services/alert-control.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { map } from 'rxjs/internal/operators/map';
import { TaskDetailsComponent } from './task-details/task-details.component';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss'],
})
export class ProjectTasksComponent implements OnInit {
  @Input() project: Project;

  tasks$: Observable<Task[]>;

  constructor(
    private modalCtrl: ModalController,
    private rest: RestService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.tasks$ = this.rest.get(`tasks/project/${this.project.id}`);
  }

  async taskDetails(task: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskDetailsComponent,
      componentProps: { task }
    });
    await modal.present();

    let response = await modal.onDidDismiss();
    if (response) this.loadData();
  }

}
