import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonList } from '@ionic/angular';
import { Product } from 'src/app/interfaces/interfaces';
import { CarrritoService } from 'src/app/services/carrrito.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  @ViewChild('lista') lista: IonList;

  productos: Product[] = [];

  total : any;

  constructor(private carritoService: CarrritoService, private payPal: PayPal, private navCtrl:NavController) { }

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
      PayPalEnvironmentProduction: 'AVPGvRV-zPfLLWdrWBCJVno4JmGpqW_cyblOdjECS6HX2H-5YsQgYuBLcFTlt1LJCqr8VsjCNTYO4Yvf',
      PayPalEnvironmentSandbox: 'AfFAkGRq_ErwEXN5GsqgpHZkBpSpK4qlYTfgVChQoMQWvjwos1dgIV_8_ffBDiQN6asokS2NZrbPkJXR'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        acceptCreditCards: true,
        languageOrLocale: 'ec-EC',
        merchantName:'Televisor Samsung',
        defaultUserEmail: 'testpaypal@gmail.com'
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Televisor SONY', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log('Pago efectuado:',res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
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
