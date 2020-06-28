import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDeEsperaPage } from './lista-de-espera.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDeEsperaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDeEsperaPageRoutingModule {}
