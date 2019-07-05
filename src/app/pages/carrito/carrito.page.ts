import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/interfaces';
import { CarrritoService } from 'src/app/services/carrrito.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  productos : Product[] = [];


  constructor(private carritoService: CarrritoService) { }

  async ngOnInit() {
    this.productos= await this.carritoService.cargarProductos();
  }
}
