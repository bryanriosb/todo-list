import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectTasksComponent } from './components/project-tasks/project-tasks.component';
import { TaskDetailsComponent } from './components/project-tasks/task-details/task-details.component';
import { TaskActionsComponent } from './components/project-tasks/task-actions/task-actions.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule,
    SharedModule
  ],
  declarations: [
    Tab1Page,
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectTasksComponent,
    TaskDetailsComponent,
    TaskActionsComponent
  ],
  providers: [ ]
})
export class Tab1PageModule {}
