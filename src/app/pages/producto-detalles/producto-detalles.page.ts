import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/interfaces/interfaces';
import { CarrritoService } from 'src/app/services/carrrito.service';

@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.page.html',
  styleUrls: ['./producto-detalles.page.scss'],
})
export class ProductoDetallesPage implements OnInit {

  producto: Product[] = [];

  oculto = 150;

  information:Product = <Product>{};

  constructor(private activatedRoute: ActivatedRoute, 
              private dataService:DataService,
              private carritoService: CarrritoService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.dataService.getDetallesProd(id).subscribe(result =>{
      // console.log('detalles: ',result);
      this.information = result;
    });
  }

  agregarCarro(){
    this.carritoService.agregarProducto(this.information); 
  }

}
