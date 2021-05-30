import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { RestService } from '../../shared/services/rest.service';


import { Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/shared/models/user';
import { Project } from '../../shared/models/project';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));
  now = moment(new Date()).locale('es').format('LL');

  destroy$ = new Subject<boolean>();

  checkprojects = false;

  projects: Project[] = [];
  cardsProjects: Project[] = [];

  constructor(
    private rest: RestService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit(): void { }

  ionViewDidEnter() {
    this.loadData();
  }

  async loadData() {
    this.rest.get('projects').subscribe((projects: Project[]) => {
      this.projects = projects;
      this.cardsProjects = projects.sort((a, b) => b.creationDate - a.creationDate).slice(0, 10);

      this.checkprojects = true;
    }, (e) => {
      console.error(e);
    });
  }

  async getProjectDetails(project: Project) {
    const modal = await this.modalCtrl.create({
      component: ProjectDetailComponent,
      componentProps: { project }
    });
    await modal.present();

    modal.onDidDismiss().then(() => {
      this.loadData();
    });
  }
}


