import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { RestService } from '../../../shared/services/rest.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public spinner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rest: RestService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.loginForm = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      'email': [null, [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]],
      'password': [null, [
        Validators.required,
        Validators.minLength(8)
      ]],
    });
  }

  async signInEmailPass() {
    this.spinner = true

    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    this.rest.login('login', {email, password}).toPromise()
    .then(response => {      
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', btoa(`${email}:${password}`));
      this.spinner = false;
      this.router.navigate(['/pages/dashboard']);

    }).catch(e => {
      this.toast.error('Credenciales incorrectas!')
      console.error('Error', e);
      this.spinner = false;
    });
  }
}
