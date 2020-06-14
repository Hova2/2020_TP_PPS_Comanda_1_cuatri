import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionDeProductosPage } from './gestion-de-productos.page';

const routes: Routes = [
  {
    path: '',
    component: GestionDeProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionDeProductosPageRoutingModule {}
