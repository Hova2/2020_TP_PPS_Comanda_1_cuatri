import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiEncuestaPage } from './mi-encuesta.page';

const routes: Routes = [
  {
    path: '',
    component: MiEncuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiEncuestaPageRoutingModule {}
