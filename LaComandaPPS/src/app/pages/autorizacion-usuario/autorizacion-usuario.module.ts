import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutorizacionUsuarioPageRoutingModule } from './autorizacion-usuario-routing.module';

import { AutorizacionUsuarioPage } from './autorizacion-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutorizacionUsuarioPageRoutingModule
  ],
  declarations: [AutorizacionUsuarioPage]
})
export class AutorizacionUsuarioPageModule {}
