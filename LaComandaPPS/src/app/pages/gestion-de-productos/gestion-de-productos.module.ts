import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionDeProductosPageRoutingModule } from './gestion-de-productos-routing.module';

import { GestionDeProductosPage } from './gestion-de-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionDeProductosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GestionDeProductosPage]
})
export class GestionDeProductosPageModule {}
