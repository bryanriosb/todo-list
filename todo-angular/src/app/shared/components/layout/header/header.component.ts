import { Component, Output, OnDestroy, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../../services/dialog.service'
import { Subscription } from 'rxjs';
import { AccountComponent } from '../../account/account.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  private subs$: Subscription;

  public counterNotification: number = 0;
  public messages: any[] = [];

  public badgeHidden: boolean = true;

  constructor(
    private router: Router,
    private dialogService: DialogService,
  ) { }

  async ngOnInit() {
  }
  
  resetCounter() {
    this.counterNotification = 0;
    this.badgeHidden = true;
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  account() {
    let response = this.dialogService.showDialogData( AccountComponent, '650px', null, false, null);
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);     
  }
}
