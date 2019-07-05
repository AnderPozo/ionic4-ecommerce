import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  entryComponents:[
    DetalleComponent
  ],
  declarations: [
    MenuComponent,
    DetalleComponent
  ],
  exports:[
    MenuComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
