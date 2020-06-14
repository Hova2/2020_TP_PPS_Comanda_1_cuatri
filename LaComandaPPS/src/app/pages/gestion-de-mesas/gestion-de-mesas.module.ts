import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionDeMesasPageRoutingModule } from './gestion-de-mesas-routing.module';

import { GestionDeMesasPage } from './gestion-de-mesas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionDeMesasPageRoutingModule
  ],
  declarations: [GestionDeMesasPage]
})
export class GestionDeMesasPageModule {}
