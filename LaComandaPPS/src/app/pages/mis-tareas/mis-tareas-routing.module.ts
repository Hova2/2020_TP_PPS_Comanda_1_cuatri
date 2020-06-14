import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisTareasPage } from './mis-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: MisTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisTareasPageRoutingModule {}
