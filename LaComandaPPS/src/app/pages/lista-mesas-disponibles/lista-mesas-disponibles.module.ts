import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaMesasDisponiblesPageRoutingModule } from './lista-mesas-disponibles-routing.module';

import { ListaMesasDisponiblesPage } from './lista-mesas-disponibles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaMesasDisponiblesPageRoutingModule
  ],
  declarations: [ListaMesasDisponiblesPage]
})
export class ListaMesasDisponiblesPageModule {}
