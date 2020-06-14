import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiEncuestaPageRoutingModule } from './mi-encuesta-routing.module';

import { MiEncuestaPage } from './mi-encuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiEncuestaPageRoutingModule
  ],
  declarations: [MiEncuestaPage]
})
export class MiEncuestaPageModule {}
