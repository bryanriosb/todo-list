import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <app-router-loader></app-router-loader>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {}
