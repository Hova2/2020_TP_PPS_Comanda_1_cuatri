import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcuestaClientePage } from './ecuesta-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: EcuestaClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcuestaClientePageRoutingModule {}
