import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-cproductos',
  templateUrl: './cproductos.component.html',
  styleUrls: ['./cproductos.component.scss'],
})
export class CproductosComponent implements OnInit {

  @Input() productos: Product[] = [];
  @Input() enFavoritos = false;

  constructor() { }

  ngOnInit() {}

}
