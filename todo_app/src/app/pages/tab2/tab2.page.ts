import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit  {
  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router ) {}

  ngOnInit() { }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
