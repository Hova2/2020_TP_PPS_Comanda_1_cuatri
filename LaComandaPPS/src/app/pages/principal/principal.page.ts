import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  paginaSeleccionada = '';
  rol: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private backgroundMode: BackgroundMode
  ) {}

  ngOnInit() {
    this.backgroundMode.enable();
    this.authService.datosUsuarioLoguado().then((doc) => {
      this.rol = doc.data().rol;
      if (this.rol === 'metre') {
        this.paginaSeleccionada = 'lista-de-espera';
      }
    });
  }

  desloguearse() {
    this.authService.logout();
  }

  redireccion(parametro: string) {
    this.paginaSeleccionada = parametro;
    switch (parametro) {
      case 'lista-de-espera':
        this.router.navigateByUrl('/principal/lista-de-espera');
        break;
      case 'escanear-qr':
        this.router.navigateByUrl('/principal/escanear-qr');
        break;
      case 'consultas':
        this.router.navigateByUrl('/principal/consultas');
        break;
      case 'autorizaciones':
        this.router.navigateByUrl('/principal/autorizaciones');
        break;
      case 'gestionDeMesas':
        this.router.navigateByUrl('/principal/gestion-de-mesas');
        break;
      case 'listadoDePedidos':
        this.router.navigateByUrl('/principal/listado-de-pedidos');
        break;
      case 'miEncuesta':
        this.router.navigateByUrl('/principal/mi-encuesta');
        break;
      case 'miPedido':
        this.router.navigateByUrl('/principal/mi-pedido');
        break;
      case 'misTareas':
        this.router.navigateByUrl('/principal/mis-tareas');
        break;
      case 'verEncuestas':
        this.router.navigateByUrl('/principal/ver-encuestas');
        break;
      case 'gestionDeProductos':
        this.router.navigateByUrl('/principal/gestion-de-productos');
        break;
    }
  }
}
