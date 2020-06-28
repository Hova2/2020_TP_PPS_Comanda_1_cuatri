import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';

import { AuthGuardGuard } from '../../servicios/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPage,
    children: [
      {
        path: 'escanear-qr',
        loadChildren: () =>
          import('../escanear-qr/escanear-qr.module').then(
            (m) => m.EscanearQRPageModule
          ),
      },
      {
        path: 'consultas',
        loadChildren: () =>
          import('../consultas/consultas.module').then(
            (m) => m.ConsultasPageModule
          ),
      },
      {
        path: 'mi-pedido',
        loadChildren: () =>
          import('../mi-pedido/mi-pedido.module').then(
            (m) => m.MiPedidoPageModule
          ),
      },
      {
        path: 'mi-encuesta',
        loadChildren: () =>
          import('../mi-encuesta/mi-encuesta.module').then(
            (m) => m.MiEncuestaPageModule
          ),
      },
      {
        path: 'autorizaciones',
        loadChildren: () =>
          import('../autorizaciones/autorizaciones.module').then(
            (m) => m.AutorizacionesPageModule
          ),
      },
      {
        path: 'listado-de-pedidos',
        loadChildren: () =>
          import('../listado-de-pedidos/listado-de-pedidos.module').then(
            (m) => m.ListadoDePedidosPageModule
          ),
      },
      {
        path: 'gestion-de-mesas',
        loadChildren: () =>
          import('../gestion-de-mesas/gestion-de-mesas.module').then(
            (m) => m.GestionDeMesasPageModule
          ),
      },
      {
        path: 'mis-tareas',
        loadChildren: () =>
          import('../mis-tareas/mis-tareas.module').then(
            (m) => m.MisTareasPageModule
          ),
      },
      {
        path: 'ver-encuestas',
        loadChildren: () =>
          import('../ver-encuestas/ver-encuestas.module').then(
            (m) => m.VerEncuestasPageModule
          ),
      },
      {
        path: 'gestion-de-productos',
        loadChildren: () =>
          import('../gestion-de-productos/gestion-de-productos.module').then(
            (m) => m.GestionDeProductosPageModule
          ),
      },
      {
        path: 'lista-de-espera',
        loadChildren: () =>
          import('../lista-de-espera/lista-de-espera.module').then(
            (m) => m.ListaDeEsperaPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalPageRoutingModule {}
