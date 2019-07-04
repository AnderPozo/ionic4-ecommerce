import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public alertController: AlertController,
    public toastController: ToastController) { }

  async alertaInfomartiva(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
