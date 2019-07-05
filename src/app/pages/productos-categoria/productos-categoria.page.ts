import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';

@Component({
  selector: 'app-productos-categoria',
  templateUrl: './productos-categoria.page.html',
  styleUrls: ['./productos-categoria.page.scss'],
})
export class ProductosCategoriaPage implements OnInit {

  //information = null;
  producto: Product[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
              private dataService:DataService,
              private modalCtrl:ModalController) { }

  ngOnInit() {
    
    let nombre = this.activatedRoute.snapshot.paramMap.get('nombre');

    // this.dataService.getProductosCategoria(nombre).subscribe(result =>{
    //   console.log('CatProductos: ',result);
    //   this.information = result;
    // });

    this.dataService.getProductosCategoria(nombre).subscribe(resp =>{
      console.log('CatProductos',resp.items);
      this.producto.push(...resp.items);
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
