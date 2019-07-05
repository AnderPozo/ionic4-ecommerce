import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Item, Product } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  producto: Product[] = [];

  televisores: Product[] = [];

  telefonos: Product[] = [];

  slideOpts ={
    slidesPerView: 1.7,
    freeMode:true
  };

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

  constructor(private menuCtrl: MenuController, 
              private dataService: DataService,
              private modalCtrl: ModalController,
              private storage: Storage) { }

  ngOnInit() {


    this.dataService.getProductos().subscribe(resp =>{
      //console.log('productos',resp.items);
      this.producto.push(...resp.items);
    });

    this.dataService.getProductosCategoria('Televisores').subscribe(resp =>{
      //console.log('televisores',resp.items);
      this.televisores.push(...resp.items);
    });

    this.dataService.getProductosCategoria('Telefonos').subscribe(resp =>{
      //console.log('telefonos',resp.items);
      this.telefonos.push(...resp.items);
    });

  }

  toggleMenu(){
    this.menuCtrl.toggle();
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
