import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonList } from '@ionic/angular';
import { Product } from 'src/app/interfaces/interfaces';
import { CarrritoService } from 'src/app/services/carrrito.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  @ViewChild('lista') lista: IonList;

  productos: Product[] = [];

  total : any;

  constructor(private carritoService: CarrritoService, 
              private payPal: PayPal, 
              private navCtrl:NavController,
              private toastCtrl: LoginService) { }

  paymentAmount: string = '3.33';
  currency: string = 'USD';
  currencyIcon: string = '$';

  async ngOnInit() {
    this.productos = await this.carritoService.cargarProductos();
    this.total = this.obtenerTotal();
  }

  async obtenerTotal(){

    this.total = 0.0;

    this.total = await this.carritoService.obtenerTotal();

    console.log(this.total);

  }



  payWithPaypal() {

    console.log(this.total);

    this.payPal.init({
      PayPalEnvironmentProduction: 'ARSJqTmt_wPKqazZDUsH_Ut3W1AwzDBfMPJYXQtwgrNZA0jnMahTvRD79PWz3w8K8n1EvPiPVwU1JuI6',
      PayPalEnvironmentSandbox: 'AWYcIiKgeIXys5TMcAahlT7edplZBNcQiA8gN1YpKf2_eP60nElvxEuB6GsXrxbvMV3ogFcWPt01kRtD'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        acceptCreditCards: true,
        languageOrLocale: 'ec-EC',
        merchantName:'Articulos canasta-fronteriza'
      })).then(() => {
        let payment = new PayPalPayment(this.total, this.currency, 'Factura Canasta transfronteriza', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          // console.log('Pago efectuado:',res);
          this.toastCtrl.alertaInfomartiva('Transferencia exitosa');
          
        }, () => {
          // Error or render dialog closed without being successful
          this.toastCtrl.alertaInfomartiva('Error al cargar el pago');

        });
      }, () => {
        // Error in configuration
        this.toastCtrl.alertaInfomartiva('Error al configurar el pago');
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
      this.toastCtrl.alertaInfomartiva('No se pudo iniciar el pago');
    });
  }




  async borrarProducto(productos: Product){
    
    await this.carritoService.eliminarProducto(productos);

    this.ngOnInit();

    this.lista.closeSlidingItems();
    
  }


  // obtenerNumero(){
  //   this.carritoService.numeroProductos();
  // }

}
