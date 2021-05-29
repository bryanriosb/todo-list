import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from '../shared/services/toast.service';
import { User } from '../shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private router: Router,
    private toastService: ToastService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const access = this.user.id ? true: false;

    if (access) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
