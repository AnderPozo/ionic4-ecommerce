import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Product } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarrritoService {

  productos: Product[] =[];

  total: any;

  mensajeCarrito: boolean = false;


  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
                this.cargarProductos();
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }            

  agregarProducto(producto: Product){

    let existe = false;
    let mensaje ='';

    for ( const prod of this.productos){
      if (prod.id_producto === producto.id_producto){
        existe = true;
        break;
      }
    }

    if (existe){
      //this.productos = this. productos.filter( prod => prod.id_producto !== producto.id_producto);
      mensaje = 'El producto ya ha sido agregado';
    }else{
      this.productos.push(producto);
      mensaje = 'Agregada al carrito';
    }

    // return !existe;


    this.presentToast(mensaje);
    this.storage.set('productos', this.productos);
  }

  async cargarProductos() {

    const productos = await this.storage.get('productos');
    this.productos = productos || [];
    return this.productos;
  }

  async existeProducto(id){
    // console.log(id);
    id = String(id);
    // console.log(id);

    await this.cargarProductos();

    const existe = this.productos.find(prod => prod.id_producto === id);

    return (existe) ? true : false;
  }



  async obtenerTotal(){

    let precio = 0;
    this.total = 0.0;

    const productos = await this.cargarProductos();

    for ( const prod of productos){

      var reemplazo = prod.precio.replace(/,/g, '');

      precio = parseFloat(reemplazo);

      this.total = this.total+ precio;
    }


    return this.total;
  }



  eliminarProducto(producto: Product){

    let existe = false;
    let mensaje ='';

    for ( const prod of this.productos){
      if (prod.id_producto === producto.id_producto){
        
        this.productos = this. productos.filter( prod => prod.id_producto !== producto.id_producto);
        mensaje = 'Producto eliminado';
      }
    }

    // if (existe){
    // }else{
    //   this.productos.push(producto);
    //   mensaje = 'Agregada al carrito';
    // }

    // return !existe;


    // this.presentToast(mensaje);
    // this.storage.set('productos', this.productos);
  }
  

}
