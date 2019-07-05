import { Component, OnInit, Input } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/interfaces/interfaces';
import { ModalController, NavController } from '@ionic/angular';
import { CarrritoService } from 'src/app/services/carrrito.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;

  oculto = 150;

  producto: Product ={};

  constructor( private dataService: DataService,
               private modalCtrl: ModalController,
               private carritoService: CarrritoService,
               private navCtrl:NavController) { }

  async ngOnInit() {
    // console.log('ID', this.id);
    const existe = await this.carritoService.existeProducto(this.id);

    console.log('Detalle component existe: ', existe);

    this.dataService.getDetallesProd(this.id)
        .subscribe(resp =>{
          console.log( resp);
          this.producto = resp;
        });    
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  agregarCarro(){
    this.carritoService.agregarProducto(this.producto);
  }

  verCarrito(){
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('/carrito', {animated: true});
  }

}
