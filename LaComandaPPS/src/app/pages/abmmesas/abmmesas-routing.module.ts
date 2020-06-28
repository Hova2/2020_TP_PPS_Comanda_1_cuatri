import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ABMmesasPage } from './abmmesas.page';

const routes: Routes = [
  {
    path: '',
    component: ABMmesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ABMmesasPageRoutingModule {}
