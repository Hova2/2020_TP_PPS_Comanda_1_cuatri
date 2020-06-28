import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedireccionarPageRoutingModule } from './redireccionar-routing.module';

import { RedireccionarPage } from './redireccionar.page';
import { ComponentsModule } from 'src/app/componentes/components/components.module';
import { SpinnerComponent } from 'src/app/componentes/spinner/spinner.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedireccionarPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RedireccionarPage],
})
export class RedireccionarPageModule {}
