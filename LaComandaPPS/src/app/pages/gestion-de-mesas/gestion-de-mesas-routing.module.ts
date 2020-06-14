import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionDeMesasPage } from './gestion-de-mesas.page';

const routes: Routes = [
  {
    path: '',
    component: GestionDeMesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionDeMesasPageRoutingModule {}
