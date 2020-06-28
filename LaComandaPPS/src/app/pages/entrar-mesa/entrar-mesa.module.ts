import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrarMesaPageRoutingModule } from './entrar-mesa-routing.module';

import { EntrarMesaPage } from './entrar-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrarMesaPageRoutingModule
  ],
  declarations: [EntrarMesaPage]
})
export class EntrarMesaPageModule {}
