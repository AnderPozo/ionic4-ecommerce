import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-cproducto',
  templateUrl: './cproducto.component.html',
  styleUrls: ['./cproducto.component.scss'],
})
export class CproductoComponent implements OnInit {

  @Input() producto: Product;
  @Input() indice: number;
  @Input() enFavoritos;


  constructor() { }

  ngOnInit() {
    console.log('Favoritos', this.enFavoritos);
  }

}
