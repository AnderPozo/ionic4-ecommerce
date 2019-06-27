import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Item, Product } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  producto: Product[] = [];

  categorias: Item[] = [];

  slides: {img: string, titulo: string, desc:string}[] =[
    {
      img: 'http://35.199.113.136/tiendaEP/modules/ps_imageslider/images/340e6b233eff20dcba3f693228db8843d36bd679_lineablanca.jpg',
      titulo: 'Linea blanca',
      desc: 'Productos de linea blanca'
    },
    {
      img: 'http://35.199.113.136/tiendaEP/modules/ps_imageslider/images/425995b2ccf9dcda4426893358753f176465c42d_televisoresbanner.png',
      titulo: '',
      desc: ''
    },
    {
      img: 'http://35.199.113.136/tiendaEP/modules/ps_imageslider/images/eee021e0f915cd44e1528d356401acf7b3caae5c_bannerelectrodomiesticos.jpg',
      titulo: '',
      desc: ''
    },
    {
      img: 'http://35.199.113.136/tiendaEP/modules/ps_imageslider/images/ac339154898dcac354271534505f01878351b284_banner-tv.png',
      titulo: '',
      desc: ''
    }
  ]

  constructor(private menuCtrl: MenuController, private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getProductos().subscribe(resp =>{
      console.log('productos',resp.items);
      this.producto.push(...resp.items);
    });

    this.dataService.getCategorias().subscribe(resp =>{
      console.log('SeccionCategorias',resp.items);
      this.categorias.push(...resp.items);
    });

  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}
