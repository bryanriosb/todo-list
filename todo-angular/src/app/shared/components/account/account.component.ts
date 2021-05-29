import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public user: User = JSON.parse(localStorage.getItem('user'));
  
  constructor() { }

  ngOnInit(): void {
  }

}
