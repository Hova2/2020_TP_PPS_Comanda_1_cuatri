import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionDeProductosPageRoutingModule } from './gestion-de-productos-routing.module';

import { GestionDeProductosPage } from './gestion-de-productos.page';
import { ComponentsModule } from 'src/app/componentes/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionDeProductosPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [GestionDeProductosPage]
})
export class GestionDeProductosPageModule {}
