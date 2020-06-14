import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoDePedidosPage } from './listado-de-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoDePedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoDePedidosPageRoutingModule {}
