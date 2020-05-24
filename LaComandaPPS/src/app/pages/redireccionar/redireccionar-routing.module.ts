import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedireccionarPage } from './redireccionar.page';

const routes: Routes = [
  {
    path: '',
    component: RedireccionarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedireccionarPageRoutingModule {}
