import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CarrritoService {

  productos: Product[] =[];

  constructor(private storage: Storage) { }



  agregarProducto(producto: Product){

    this.productos.push(producto);
    
    this.storage.set('productos', this.productos);
  }
}
