import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoDePedidosPageRoutingModule } from './listado-de-pedidos-routing.module';

import { ListadoDePedidosPage } from './listado-de-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoDePedidosPageRoutingModule
  ],
  declarations: [ListadoDePedidosPage]
})
export class ListadoDePedidosPageModule {}
