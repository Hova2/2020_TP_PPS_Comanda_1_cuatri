import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosEmpleadoPageRoutingModule } from './pedidos-empleado-routing.module';

import { PedidosEmpleadoPage } from './pedidos-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosEmpleadoPageRoutingModule
  ],
  declarations: [PedidosEmpleadoPage]
})
export class PedidosEmpleadoPageModule {}
