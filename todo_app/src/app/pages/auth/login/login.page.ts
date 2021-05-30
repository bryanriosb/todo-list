import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../../../shared/services/loading.service';
import { RestService } from '../../../shared/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = new FormControl(null, [Validators.required]);
  password = new FormControl(null, [Validators.required,  Validators.minLength(8)]);

  constructor(
    private rest: RestService,
    private router: Router,
    private toast: ToastService,
    private loading: LoadingService
  ) { }

  ngOnInit() {}

  async signIn() {
    this.loading.presentLoading('Iniciando...');

    let email = this.username.value;
    let password = this.password.value;

    this.rest.login('login', {email, password}).toPromise()
    .then(response => {
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', btoa(`${email}:${password}`));
      this.loading.cancelLoading();
      this.router.navigate(['/tabs/tab1']);

    }).catch(e => {
      this.toast.simpleToast('Credenciales incorrectas!', 'danger')
      console.error('Error', e);
      this.loading.cancelLoading();
    });
  }
}
