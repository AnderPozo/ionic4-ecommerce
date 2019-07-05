import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logindata: any = {};
  

  constructor(public navCtrl: NavController, public http: Http, private loginService: LoginService,private storage: Storage) {
    this.logindata.usuario = "";
    this.logindata.password = "";
   }

  ngOnInit() {
  }

  login(){
    if ( this.logindata.usuario !="" && this.logindata.password !=""){
      // console.log('usuario:', this.logindata.usuario);
      // console.log('password:', this.logindata.password);

      let url: string = 'http://35.199.113.136/prestashopWS/login/login.php';

      let dataPost = JSON.stringify({
        usuario: this.logindata.usuario,
        password:this.logindata.password
      }); 

      this.http.post(url,dataPost)
      .subscribe(data =>{
        console.log(data);

        if (data['_body'] == "true"){
          //console.log('Inicio de sesion exitoso');
          this.loginService.guardarDatos(this.logindata.usuario);
          this.navCtrl.navigateRoot('/inicio', {animated: true});
          this.loginService.presentToast('Bienvenido usuario');
        }else{
          //console.log('Error al iniciar sesión');
          this.loginService.alertaInfomartiva("Usuario y contraseña no son correctos");
          this.logindata.usuario = null;
          this.storage.clear();
        }
      });

    }else{
      console.log('Ingrese todos los datos');
    }
  }

  

}
