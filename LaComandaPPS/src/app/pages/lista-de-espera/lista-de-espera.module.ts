import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDeEsperaPageRoutingModule } from './lista-de-espera-routing.module';

import { ListaDeEsperaPage } from './lista-de-espera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDeEsperaPageRoutingModule
  ],
  declarations: [ListaDeEsperaPage]
})
export class ListaDeEsperaPageModule {}
