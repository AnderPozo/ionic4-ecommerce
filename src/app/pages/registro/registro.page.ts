import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Storage } from '@ionic/storage';
// import 'rxjs/Rx';
// import 'rxjs/operator/map';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  logindata: any = {};

  constructor( public navCtrl: NavController, public http: Http, private loginService: LoginService,private storage: Storage) {
    this.logindata.nombre = "";
    this.logindata.apellidos = "";
    this.logindata.correo = "";
    this.logindata.password = "";
   }

  ngOnInit() {
  }

  submit() {
    if (this.logindata.nombre != "" && this.logindata.apellidos != "" &&
      this.logindata.correo != "" && this.logindata.password != "") {

      // console.log('nombre:', this.logindata.nombre);
      // console.log('apellido:', this.logindata.apellidos);
      // console.log('correo:', this.logindata.correo);
      // console.log('password:', this.logindata.password);

      let url: string = 'http://35.199.113.136/prestashopWS/metodos/crearUsuario.php';

      
      let dataPost = JSON.stringify({
        nombre: this.logindata.nombre,
        apellido: this.logindata.apellidos,
        correo: this.logindata.correo,
        password:this.logindata.password
      }); 

      this.http.post(url,dataPost)
      .subscribe(data =>{
        console.log(data);

        if (data['ok']){

          console.log('Usuario creado satisfactoriamente');
          this.loginService.alertaInfomartiva("Usuario creado correctamente");
          this.loginService.guardarDatos(this.logindata.correo);
          this.navCtrl.navigateRoot('/inicio', {animated: true});

        }else{
          this.loginService.alertaInfomartiva("Upss...Algo salió mal");
          this.logindata.correo = null;
          this.storage.clear();
        }
      });
    }else{
      //console.log('Algo ha ido mal');
      this.loginService.alertaInfomartiva('Por favor ingrese todos los campos');
    }
  }

}
