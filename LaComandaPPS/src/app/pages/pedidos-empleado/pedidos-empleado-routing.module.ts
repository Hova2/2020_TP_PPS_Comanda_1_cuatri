import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosEmpleadoPage } from './pedidos-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosEmpleadoPageRoutingModule {}
