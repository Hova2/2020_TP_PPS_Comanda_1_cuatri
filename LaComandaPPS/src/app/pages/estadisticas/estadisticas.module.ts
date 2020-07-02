import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticasPageRoutingModule } from './estadisticas-routing.module';

import { EstadisticasPage } from './estadisticas.page';
import { ComponentesModule } from 'src/app/modules/componentes/componentes.module';
import { PrimengModule } from 'src/app/componentes/components/primeNG.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticasPageRoutingModule,
    ComponentesModule,
    PrimengModule

  ],
  declarations: [EstadisticasPage]
})
export class EstadisticasPageModule {}

