import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuActiveService } from '../../shared/services/menu-active.service';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { ReportComponent } from '../../shared/components/report/report.component';
import { AlertControlService } from '../../shared/services/alert-control.service';
import { RestAuthService } from '../../shared/services/rest-auth.service';
import { ToastService } from '../../shared/services/toast.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../shared/models/user';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {

  userData: LoginResponse = JSON.parse(localStorage.getItem('response'));

  constructor(
    private menu: MenuActiveService,
    private modalCtrl: ModalController,
    private alertControlService: AlertControlService,
    private restAuth: RestAuthService,
    private toast: ToastService,
    private router: Router,
    private loading: LoadingService
  ) { menu.active(); }

  ngOnInit() { }

  async userDetail() {
    const modal = await this.modalCtrl.create({
      component: UserProfileComponent,
      componentProps: { document }
    });
    await modal.present();
  }

  async reports(reportName: string) {
    const modal = await this.modalCtrl.create({
      component: ReportComponent,
      componentProps: { reportName }
    });
    await modal.present();
  }

  async logout() {
    const handler = () => {
      this.loading.presentLoading('Cerrando Sesión...');

      let token = localStorage.getItem('token');
      let data = {token};

      let response = this.restAuth.signOut(data).toPromise();
      response.then(result => {
        this.menu.deactive();
        this.router.navigate(['/login']);
        localStorage.removeItem('response');
        localStorage.removeItem('token');

        setTimeout(() => {
          this.loading.cancelLoading();
        }, 200);

      }).catch( async (e) => {
        if (e.error.error === 'Token inválido') {
          this.router.navigate(['/login']);
          const res = await this.restAuth.refreshToken();
          if (res) {
            token = localStorage.getItem('token');
            data = {token};
            response = await this.restAuth.signOut(data).toPromise();
          }
          this.loading.cancelLoading();
        }
      });
    };

    this.alertControlService.showAlert(
      'Cierre de Sesión',
      '¿Desea cerrar la sesión?',
      'No',
      'Sí',
      handler
    );
  }
}
