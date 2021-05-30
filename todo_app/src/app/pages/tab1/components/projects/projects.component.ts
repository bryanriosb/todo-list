import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../shared/models/project';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @Input() projects: Project[] = [];

  showSkeleton = true;

  slidesOptions = {
    slidesPerView: 1.5
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    setTimeout(() => {
      this.showSkeleton = false;
    }, 1200);
  }

  async getProjectDetails(project: Project) {
    const modal = await this.modalCtrl.create({
      component: ProjectDetailComponent,
      componentProps: { project }
    });
    await modal.present();
  }

}
