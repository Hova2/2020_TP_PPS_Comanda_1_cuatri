import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { SonidoService } from 'src/app/servicios/sonido.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  paginaSeleccionada = '';
  rol: string;

  sonidoActivado: boolean = null;

  constructor(private authService: AuthService, private router: Router, private sonidoService: SonidoService) {}

  ngOnInit() {
    this.authService.datosUsuarioLoguado().then((doc) => {
      this.rol = doc.data().rol;
      switch (this.rol) {
        case 'metre':
          this.paginaSeleccionada = 'lista-de-espera';
          break;
        case 'cocinero':
        case 'bartender':
          this.paginaSeleccionada = 'pedidosempleado';
          break;
        case 'mozo':
          this.paginaSeleccionada = 'pedidosmozo';
          break;
        case 'socio':
          this.paginaSeleccionada = 'autorizarusuario';
          break;
        case 'cliente':
          this.paginaSeleccionada = 'pedido';
          break;
      }
    });
    this.sonidoActivado = this.sonidoService.sonidoActivado;
  }

  desloguearse() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  redireccion(parametro: string) {
    this.sonidoService.start(this.sonidoService.playlist[0]);
    this.paginaSeleccionada = parametro;
    switch (parametro) {
      case 'lista-de-espera':
        this.router.navigateByUrl('/principal/lista-de-espera');
        break;
      case 'pedidosempleado':
        this.router.navigateByUrl('/principal/pedidos-empleado');
        break;
      case 'pedidosmozo':
        this.router.navigateByUrl('/principal/pedidos-mozo');
        break;
      case 'autorizarusuario':
        this.router.navigateByUrl('/principal/autorizacion-usuario');
        break;
      case 'pedido':
        this.router.navigateByUrl('/principal/mi-pedido');
        break;
      case 'escanearqr':
        this.router.navigateByUrl('/principal/escanear-qr');
        break;
      case 'consultas':
        this.router.navigateByUrl('/principal/consultas');
        break;
      case 'gestionproductos':
        this.router.navigateByUrl('/principal/gestion-de-productos');
        break;
      case 'gestionmesas':
        this.router.navigateByUrl('/principal/abmmesas');
        break;
      case 'estadisticas':
        this.router.navigateByUrl('/principal/estadisticas');
        break;
      case 'ver-encuestas':
        this.router.navigateByUrl('/principal/ver-encuestas');
        break;
      case 'listamesasdisponibles':
        this.router.navigateByUrl('/principal/lista-mesas-disponibles');
        break;
    }
  }

  onOffSonido(){
    this.sonidoService.sonidoActivado = !this.sonidoService.sonidoActivado;
    this.sonidoActivado = this.sonidoService.sonidoActivado;
  }
}
