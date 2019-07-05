import { Component, OnInit } from '@angular/core';
import { Item, Product } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { EventEmitter } from 'events';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  textoBuscar= '';

  buscando = false;
 
  articulos : Product[] =[];

  ideas: string[] =['Cocina','Laptop', 'Celular','Samsung Galaxy','Xiaomi','Sony TV','Televisor'];

  constructor(private dataService: DataService,
              private modalCtrl:ModalController) { }

  ngOnInit() {
    // this.dataService.getProductos().subscribe(resp =>{
    //   //console.log('ideas', resp.items);
    //   this.productos.push(...resp.items);
    // });
  }

  buscar(event){
    const valor:string = event.detail.value;

    if(valor.length === 0){
      this.buscando = false;
      this.articulos = [];
      return;
    }
    
    this.buscando = true;
    this.dataService.buscarProductos(valor)
      .subscribe(resp =>{
        console.log(resp);
        this.articulos =resp.items;
        this.buscando = false;

      });
  }

  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
