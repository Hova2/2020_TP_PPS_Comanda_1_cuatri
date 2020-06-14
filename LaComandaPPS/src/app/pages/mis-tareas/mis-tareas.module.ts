import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisTareasPageRoutingModule } from './mis-tareas-routing.module';

import { MisTareasPage } from './mis-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisTareasPageRoutingModule
  ],
  declarations: [MisTareasPage]
})
export class MisTareasPageModule {}
