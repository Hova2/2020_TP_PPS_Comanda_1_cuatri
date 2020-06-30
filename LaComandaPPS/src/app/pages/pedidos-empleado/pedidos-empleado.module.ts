import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosEmpleadoPageRoutingModule } from './pedidos-empleado-routing.module';

import { PedidosEmpleadoPage } from './pedidos-empleado.page';
import { ComponentesModule } from 'src/app/modules/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosEmpleadoPageRoutingModule,
    ComponentesModule,
  ],
  declarations: [PedidosEmpleadoPage],
})
export class PedidosEmpleadoPageModule {}
