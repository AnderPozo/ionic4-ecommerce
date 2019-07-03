import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CproductosComponent } from './cproductos/cproductos.component';
import { CproductoComponent } from './cproducto/cproducto.component';

@NgModule({
  declarations: [
    MenuComponent,
    CproductoComponent,
    CproductosComponent
  ],
  exports:[
    MenuComponent,
    CproductosComponent,
    CproductoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
