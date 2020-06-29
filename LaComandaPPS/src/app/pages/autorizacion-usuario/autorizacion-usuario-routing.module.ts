import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutorizacionUsuarioPage } from './autorizacion-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: AutorizacionUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorizacionUsuarioPageRoutingModule {}
