import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: any;

  constructor(public loadingController: LoadingController) {}

  async presentLoading( message: string ) {
    const loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message,
      backdropDismiss: true,
      spinner: 'lines-small'
    });
    await loading.present();
  }

  async cancelLoading() {
    await this.loadingController.dismiss();
  }

}
