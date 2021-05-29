import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Project } from '../../../../shared/models/project';
import { Router } from '@angular/router';
import { GenerateAliasService } from '../../../../shared/services/generate-alias.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  public form: FormGroup;
  
  public users$: Observable<User[]>;

  public minDate = new Date();

  public spinner = false;

  public buttonText = 'Crear Proyecto';

  constructor(
    private formBuilder: FormBuilder,
    private rest: RestService,
    private dateTimeService: DateTimeService,
    private toast: ToastService,
    private router: Router,
    public alias: GenerateAliasService,
    private dialogRef: MatDialogRef<ProjectManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
  ) {
    this.form = this.createForm();
    this.dateTimeService.format = 'LL';
  }

  ngOnInit(): void {
    this.users$ = this.rest.get('users');

    if (this.data.id) {      
      this.buttonText = 'Actualizar';
      this.loadDataProject(this.data);
    }
  }

  loadDataProject(project: Project) {
    const labels = [
      'id',
      'name',
      'description',
      'alias',
      'state',
      'startDate',
      'finishDate',
      'user',
      'deleted',
      'creationDate',
      'updateDate'
    ];

    labels.forEach((label: any) => {
      if (label === 'startDate') {
        this.form.get(label).patchValue(new Date(project[label]));

      } else if (label === 'user') {
        this.form.get(label).setValue(project[label]['id']);

      } else {
        this.form.get(label).setValue(project[label]);
      }
    });
  }

  createForm() {
    return  this.formBuilder.group({
      id: [],
      name: [ null, Validators.required],
      description: [ null, Validators.required],
      alias: [null, Validators.required],
      state: [true],
      startDate: [new Date(), Validators.required],
      finishDate: [],
      user: [null, Validators.required],
      deleted: [false],
      creationDate: [new Date().getTime()],
      updateDate: []
    });
  }

  async createProject() {
    this.spinner = true;
    try {
      let startDate = this.form.value.startDate;
      this.form.value.startDate = new Date(startDate).getTime();
      
      let user = {id: this.form.value.user};
      this.form.value.user = user;

      let response = await this.rest.post('projects', this.form.value).toPromise();
      
      this.toast.succes('Proyecto creado correctamente');
      this.spinner = false;
      this.router.navigate(['pages/dashboard'])

    } catch(e) {
      this.toast.error('No se pudo crear el proyecto, por favor intenta de nuevo');
      this.spinner = false;
    }  
  }

  async updateProject() {
    this.spinner = true;
    try { 
      let startDate = this.form.value.startDate;
      this.form.value.startDate = new Date(startDate).getTime();

      this.form.value.updateDate = new Date().getTime();

      let user = {id: this.form.value.user};
      this.form.value.user = user;

      let projectId = this.form.value.id;
      let response = await this.rest.update(`projects/${projectId}`, this.form.value).toPromise();

      this.toast.succes('Proyecto actualizado correctamente');
      this.dialogRef.close(true);
      this.spinner = false;

    } catch(e) {
      this.toast.error('No se pudo actualizar, por favor intenta de nuevo');
      this.spinner = false;
    }  
  }
}
