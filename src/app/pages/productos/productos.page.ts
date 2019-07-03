import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Product[]=[];

  constructor( private dataService:DataService) { }

  ngOnInit() {
    this.cargarProductos();
  }

  loadData(event){
    console.log(event);
    this.cargarProductos(event);
  }

  cargarProductos(event?){
    this.dataService.getTodosProductos()
      .subscribe(resp=>{
        //console.log('noticias',resp);

        if(resp.items.length === 0){
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        //this.noticias = resp.articles;
        this.productos.push( ...resp.items);

        if(event){
          event.target.complete();
        }
      });
  }

}
