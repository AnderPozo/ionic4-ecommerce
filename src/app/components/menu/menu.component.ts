import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Item } from 'src/app/interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Item[] = [];

  constructor( private dataService: DataService,
               private storage: Storage, 
               private navCtrl: NavController) { }

  ngOnInit(){
    this.dataService.getCategorias().subscribe(resp =>{
      //console.log('categorias',resp.items);
      this.componentes.push(...resp.items);
    });
  }

  cerrarSesion(){
    this.storage.remove('usuario');
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }
}
