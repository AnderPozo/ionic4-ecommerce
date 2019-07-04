import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';


const url: string = 'http://35.199.113.136/prestashopWS/login/login.php';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario : string =null;

  constructor(public alertController: AlertController,
    public toastController: ToastController,
    private http: HttpClient,
    private storage: Storage) { }

  async alertaInfomartiva(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'contact',
          text: 'Hola',
        }
      ]
    });
    await toast.present();
  }

  // login(usuario: string, password: string){
  //   const data ={usuario, password};

  //   this.http.post(url,data)
  //   .subscribe(resp =>{
  //     console.log(resp);
  //   });
  // }

  async guardarDatos(usuario: string){
    this.usuario = usuario;
    await this.storage.set('usuario', usuario);
  }

}
