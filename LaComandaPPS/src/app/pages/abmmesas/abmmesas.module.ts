import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ABMmesasPageRoutingModule } from './abmmesas-routing.module';

import { ABMmesasPage } from './abmmesas.page';
import { ComponentsModule } from 'src/app/componentes/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    ABMmesasPageRoutingModule
  ],
  declarations: [ABMmesasPage]
})
export class ABMmesasPageModule {}
