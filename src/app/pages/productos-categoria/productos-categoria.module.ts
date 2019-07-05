import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductosCategoriaPage } from './productos-categoria.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ProductosCategoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductosCategoriaPage]
})
export class ProductosCategoriaPageModule {}
