import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectManagementComponent,
    ProjectsTableComponent,
    TaskManagementComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    DragDropModule
  ],
  exports: [
    ProjectsTableComponent,
    TasksComponent
  ],
  providers: [
    { 
      provide: MatDialogRef,
      useValue: []
       }, 
      { 
      provide: MAT_DIALOG_DATA, 
      useValue: [] 
      }
  ]
})
export class ProjectsModule { }
