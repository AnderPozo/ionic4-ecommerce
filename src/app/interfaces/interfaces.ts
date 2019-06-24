export interface RespuestaTopHeadLines {
    statuscode: number;
    items: Item[];
  }
  
export interface Item {
    id_categoria: string;
    nombre: string;
    urlImagen: string;
}


export interface RespuestaProductHeadLines {
    statuscode: number;
    items: Product[];
  }

export interface Product {
    id_producto: string;
    precio: string;
    nombre: string,
    urlImagen: string;
    descripcion: string;
}