import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosMozoPageRoutingModule } from './pedidos-mozo-routing.module';

import { PedidosMozoPage } from './pedidos-mozo.page';
import { ComponentesModule } from 'src/app/modules/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosMozoPageRoutingModule,
    ComponentesModule
  ],
  declarations: [PedidosMozoPage],
})
export class PedidosMozoPageModule {}
