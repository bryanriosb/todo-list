import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {}

  async options( message: string, color: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    toast.present();
  }

  async simpleToast( message: string, color: string ) {
    this.options(message, color);
  }

  async customToast(message: string, color: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color,
    });
    toast.present();
  }

}
