import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateTimeService } from 'src/app/shared/services/date-time/date-time.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { GenerateAliasService } from 'src/app/shared/services/generate-alias.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { DeleteComponent } from '../../shared/components/delete/delete.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public user: User = JSON.parse(localStorage.getItem('user'));
  public form: FormGroup;

  public spinner = false;

  public roles$: Observable<any[]>;
  public users$: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private rest: RestService,
    private dateTimeService: DateTimeService,
    private toast: ToastService,
    public alias: GenerateAliasService,
    private dialogService: DialogService
  ) {
    this.form = this.createForm();
    this.dateTimeService.format = 'LL';
  }

  ngOnInit(): void {
    this.roles$ = this.rest.get('roles');
    this.loadData();
  }

  loadData() {
    this.users$ = this.rest.get('users');
  }

  createForm() {
    return  this.formBuilder.group({
      id: [],
      name: [ null, Validators.required],
      identityCard: [ null, [
        Validators.required,
        Validators.min(1000000),
        Validators.max(1800000000)
        ]
      ],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8)
      ]],
      state: [true],
      role: [null],
      deleted: [false],
      creationDate: [new Date().getTime()],
      updateDate: []
    });
  }

  async createUser() {
    this.spinner = true;
    try {
      let response = await this.rest.post('users', this.form.value).toPromise();
      
      this.toast.succes('Usuario creado correctamente');
      this.spinner = false;
      this.form.reset();
      
    } catch(e) {
      this.toast.error('No se pudo crear el usuario, por favor intenta de nuevo');
      this.spinner = false;
    }  
  }

  async delete(user: User) {
    const data = `users/${user.id}`    
    let response = await this.dialogService.showDialogData( DeleteComponent, '300px', null, true, data);
    if (response) {
      setTimeout(() => {
        this.loadData();
      }, 1500);
    }
  }

}
