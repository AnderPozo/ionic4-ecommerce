import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Item } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Item[] = [];

  constructor( private dataService: DataService) { }

  ngOnInit(){
    this.dataService.getCategorias().subscribe(resp =>{
      console.log('categorias',resp.items);
      this.componentes.push(...resp.items);
    });
  }
}
