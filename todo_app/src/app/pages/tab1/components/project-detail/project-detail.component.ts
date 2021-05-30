import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../shared/models/project';
import { ModalController } from '@ionic/angular';
import { RestService } from '../../../../shared/services/rest.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { AlertControlService } from '../../../../shared/services/alert-control.service';
import { ProjectTasksComponent } from '../project-tasks/project-tasks.component';
import { User } from '../../../../shared/models/task';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));

  @Input() project: Project;

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

  async tasks() {
    const modal = await this.modalCtrl.create({
      component: ProjectTasksComponent,
      componentProps: { project: this.project }
    });
    await modal.present();
  }

  delete() {
    const handler = async () => {
      this.loading.presentLoading('Borrando..')
      try {
        const path = `projects/${this.project.id}`;
        this.rest.delete(path).toPromise();
        this.toast.simpleToast('Projecto eliminado', 'primary');
        this.modalCtrl.dismiss();
        this.loading.cancelLoading();

      } catch(e) {
        this.loading.cancelLoading();
        this.toast.simpleToast('No se pudo eliminar el proyecto, por favor intente de nuevo', 'danger');
      }
    }
    this.alertControlService.showAlert(
      'Eliminar',
      `¿Está seguro de eliminar definitivamente el proyecto?`,
      'Cancelar',
      'Confirmar',
      handler
    );
  }
}
