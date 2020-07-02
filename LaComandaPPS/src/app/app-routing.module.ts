import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'redireccionar', pathMatch: 'full' },
  //{ path: '', redirectTo: 'principal', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./pages/redireccionar/redireccionar.module').then(
        (m) => m.RedireccionarPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import('./pages/principal/principal.module').then(
        (m) => m.PrincipalPageModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'entrar-mesa',
    loadChildren: () =>
      import('./pages/entrar-mesa/entrar-mesa.module').then(
        (m) => m.EntrarMesaPageModule
      ),
  },
  {
    path: 'anonimo',
    loadChildren: () =>
      import('./pages/anonimo/anonimo.module').then((m) => m.AnonimoPageModule),
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
