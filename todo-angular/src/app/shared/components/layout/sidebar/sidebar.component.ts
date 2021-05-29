import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public user: User = JSON.parse(localStorage.getItem('user'));

  constructor() { }

  ngOnInit(): void { 
    // Activación de opciones segun ROL
  }

}
