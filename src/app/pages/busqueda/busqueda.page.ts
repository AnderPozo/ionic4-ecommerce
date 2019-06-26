import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  componentes: Item[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCategorias().subscribe(resp =>{
      console.log('categorias',resp.items);
      this.componentes.push(...resp.items);
    });
  }

}
