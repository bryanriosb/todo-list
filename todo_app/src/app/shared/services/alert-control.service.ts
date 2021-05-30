import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertControlService {

  constructor(private alertController: AlertController) { }

  async showAlert(header: string, message: string, cancel: string, confirm: string, handler: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: cancel,
          role: 'cancel'
        }, {
          text: confirm,
          handler
        }
      ]
    });
    await alert.present();
  }
}
