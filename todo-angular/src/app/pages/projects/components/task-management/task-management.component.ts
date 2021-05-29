import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../shared/models/user';
import { Observable } from 'rxjs';
import { GenerateAliasService } from '../../../../shared/services/generate-alias.service';
import { Project } from '../../../../shared/models/project';
import { Task } from '../../../../shared/models/task';
import { DeleteComponent } from '../../../../shared/components/delete/delete.component';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit, AfterViewInit {
  public user: User = JSON.parse(localStorage.getItem('user'));
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'name',
    'description',
    'startDate',
    'user',
    'updateDate',
    'finishDate',
    'advance',
    'update',
    'delete'
  ]

  public form: FormGroup;
  public minDate = new Date();
  public users$: Observable<User[]>;

  public spinner = false;

  public updateBtnTask = false;

  constructor(
    private formBuilder: FormBuilder,
    private rest: RestService,
    private dateTimeService: DateTimeService,
    private toast: ToastService,
    private dialogService: DialogService,
    public alias: GenerateAliasService,
    private dialogRef: MatDialogRef<TaskManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {
    this.form = this.createForm();
    this.dateTimeService.format = 'LL';
  }

  ngOnInit(): void {
    this.users$ = this.rest.get('users');
    this.loadData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  createForm() {
    return  this.formBuilder.group({
      id: [],
      name: [ null, Validators.required],
      description: [ null, Validators.required],
      project: [],
      alias: [null, Validators.required],
      state: [true],
      user: [null, Validators.required],
      time: [null],
      advance: [0],
      deleted: [],
      startDate: [new Date(), Validators.required],
      creationDate: [new Date().getTime()],
      updateDate: [],
      finishDate: []
    });
  }

  async loadData() {
    this.dataSource.data = await this.rest.get(`tasks/project/${this.data.id}`).toPromise();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadDataTask(task: Task) {
    setTimeout(() => {
      this.toast.succes('Datos cargados en el formulario');
      this.updateBtnTask = true
    }, 200);

    const labels = [
      'id',
      'name',
      'description',
      'project',
      'alias',
      'state',
      'user',
      'time',
      'advance',
      'deleted',
      'startDate',
      'creationDate',
      'updateDate',
      'finishDate',
    ];

    labels.forEach((label: any) => {
      if (label === 'startDate') {
        this.form.get(label).patchValue(new Date(task[label]));

      } else if (label === 'user' || label === 'project') {
        if (task[label])  this.form.get(label).setValue(task[label]['id']);
        
      } else {
        if (task[label])  this.form.get(label).setValue(task[label]);
      }
    });
  }

  async updateTask() {
    this.spinner = true;
    try { 
      let startDate = this.form.value.startDate;
      this.form.value.startDate = new Date(startDate).getTime();

      this.form.value.updateDate = new Date().getTime();      

      let user = {id: this.form.value.user};
      this.form.value.user = user;

      let project = {id: this.form.value.project};
      this.form.value.project = project;

      let taskId = this.form.value.id;
      let response = await this.rest.update(`tasks/${taskId}`, this.form.value).toPromise();
      this.form.reset();
      this.updateBtnTask = false;

      setTimeout(() => {
        this.loadData();
      }, 500);

      this.toast.succes('Tarea actualizada correctamente');
      this.spinner = false;

    } catch(e) {
      this.toast.error('No se pudo actualizar, por favor intenta de nuevo');
      this.spinner = false;
    }
  }

  async delete(task: Task) {
    const data = `tasks/${task.id}`    
    let response = await this.dialogService.showDialogData( DeleteComponent, '300px', null, true, data);
    if (response) {
      setTimeout(() => {
        this.loadData();
      }, 1500);
    }
  }

  async createTask() {
    this.spinner = true;
    try {
      let project = {id: this.data.id}
      this.form.value.project = project;

      let startDate = this.form.value.startDate;
      this.form.value.startDate = new Date(startDate).getTime();
      
      let user = {id: this.form.value.user};
      this.form.value.user = user;

      this.form.get('deleted').setValue(false);

      let response = await this.rest.post('tasks', this.form.value).toPromise();

      if (response) {
        setTimeout(() => {
          this.loadData();
        }, 1000);
      }
      
      this.toast.succes('Tarea creada correctamente');
      this.spinner = false;
      this.form.reset();
      
    } catch(e) {
      this.toast.error('No se pudo crear el proyecto, por favor intenta de nuevo');
      this.spinner = false;
    }  
  }

  close() {
    this.dialogRef.close();
  }
  
}


