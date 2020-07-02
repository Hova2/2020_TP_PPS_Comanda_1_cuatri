import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcuestaClientePageRoutingModule } from './ecuesta-cliente-routing.module';

import { EcuestaClientePage } from './ecuesta-cliente.page';
import { ComponentsModule } from 'src/app/componentes/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    EcuestaClientePageRoutingModule
  ],
  declarations: [EcuestaClientePage]
})
export class EcuestaClientePageModule {}
