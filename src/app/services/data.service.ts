import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, RespuestaTopHeadLines, RespuestaProductHeadLines, Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  urlDetalleProd = 'http://35.199.113.136/tienda-API/api/productos/api-productos.php';

  urlBusqueda='http://35.199.113.136/tienda-API/api/productos/buscarProducto.php';

  constructor(private http:HttpClient) { }


  getCategorias(){
    return this.http.get<RespuestaTopHeadLines>('http://35.199.113.136/tienda-API/api/categorias/api-categorias.php');
  }

  getProductos(){
    return this.http.get<RespuestaProductHeadLines>('http://35.199.113.136/tienda-API/api/productos/api-productos.php');
  }

  getDetallesProd(id){
    return this.http.get<Product>(`${this.urlDetalleProd}?producto=${id}`);
  }

  getProductosCategoria(nombre){
    return this.http.get<RespuestaProductHeadLines>(`${this.urlDetalleProd}?categoria=${nombre}`);
  }

  
  getTodosProductos(){
    return this.http.get<RespuestaProductHeadLines>('http://35.199.113.136/tienda-API/api/productos/getProductos.php');
  }

  buscarProductos(texto: string){
    return this.http.get<RespuestaProductHeadLines>(`${this.urlBusqueda}?nombre=${texto}`);
  }

  

}
