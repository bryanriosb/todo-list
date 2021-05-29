import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from '../../shared/models/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public user: User = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    
  }
  
}
