import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, RespuestaTopHeadLines, RespuestaProductHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }


  getCategorias(){
    return this.http.get<RespuestaTopHeadLines>('http://35.199.113.136/tienda-API/api/categorias/api-categorias.php');
  }

  getProductos(){
    return this.http.get<RespuestaProductHeadLines>('http://35.199.113.136/tienda-API/api/productos/api-productos.php');
  }

}
