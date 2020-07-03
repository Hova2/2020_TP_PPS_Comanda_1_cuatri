import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaMesasDisponiblesPage } from './lista-mesas-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: ListaMesasDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaMesasDisponiblesPageRoutingModule {}
