import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnonimoPageRoutingModule } from './anonimo-routing.module';

import { AnonimoPage } from './anonimo.page';
import { ComponentsModule } from 'src/app/componentes/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AnonimoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AnonimoPage]
})
export class AnonimoPageModule {}
