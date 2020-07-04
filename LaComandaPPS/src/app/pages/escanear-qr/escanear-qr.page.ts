import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QrService } from 'src/app/servicios/qr.service';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { Producto } from 'src/app/clases/producto';
import { AuthService } from 'src/app/servicios/auth.service';
import { MesaService } from 'src/app/servicios/mesa.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { Pedido } from 'src/app/clases/pedido';
import { EstadoPedido } from 'src/app/enum/estado-pedido.enum';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
})
export class EscanearQRPage implements OnInit {

  private pedido: Pedido = new Pedido();
  private algoPedido: boolean = false;
  private acumulador: number;
  private pidioCuenta: boolean = false;

  constructor(
    private authService: AuthService,
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private router: Router,
    private qrs: QrService,
    private toastr: ServicioToastService) { }

  ngOnInit() {
  }

  async escanearQRMesa() {

    //this.actualizarPedido("P8juuoqK6qkgGXxZ6xOe");
    
    const docTmp = await this.authService.datosUsuarioLoguado();
    const mesa = await this.mesaService.traerMesaDelCliente(docTmp.id);
    const resultado = await this.qrs.escanear();

    
    

    if (mesa.id == resultado.text) {

      this.actualizarPedido(mesa.idPedido);
    } else {
      this.toastr.mostrarToast('Codigo incorrecto', ColoresToast.danger);
    }
  }

  actualizarPedido(idPedido: string) {
    this.pedidoService.traerPedidoPorIdDocumento(idPedido).then(pedidoDeAca => {
      this.algoPedido = true;
      this.pedido = pedidoDeAca;
    }).catch(() => {
      this.toastr.mostrarToast("No hay pedidos", ColoresToast.danger);
    });
  }

  async asignarPropina() {
    let producto = Producto.crear(null, null, null, null, null, null, null, null, null);
    const resultado = await this.qrs.escanear();
    this.sumarSinPropina();

    switch (resultado.text) {
      case '00':
        producto.descripcion = '0%';
        producto.nombre = 'propina';
        setTimeout(() => {
          producto.precio = this.acumulador * 0;
          this.pedidoService.agregarPropina(producto, this.pedido.pedidoID);
        }, 1000);
        break;
        case '05':
        producto.descripcion = '5%';
        producto.nombre = 'propina';
        setTimeout(() => {
          producto.precio = this.acumulador * 0.05;
          this.pedidoService.agregarPropina(producto, this.pedido.pedidoID);
        }, 1000);
        break;
      case '10':
        producto.descripcion = '10%';
        producto.nombre = 'propina';
        setTimeout(() => {
          producto.precio = this.acumulador * 0.1;
          this.pedidoService.agregarPropina(producto, this.pedido.pedidoID);
        }, 1000);
        break;
        case '15':
        producto.descripcion = '15%';
        producto.nombre = 'propina';
        setTimeout(() => {
          producto.precio = this.acumulador * 0.15;
          this.pedidoService.agregarPropina(producto, this.pedido.pedidoID);
        }, 1000);
        break;
      case '20':
        producto.descripcion = '20%';
        producto.nombre = 'propina';
        setTimeout(() => {
          producto.precio = this.acumulador * 0.2;
          this.pedidoService.agregarPropina(producto, this.pedido.pedidoID);
        }, 1000);
        break;
      default:
        this.toastr.mostrarToast('Codigo incorrecto', ColoresToast.danger);
        break;
    }
  }

  sumarSinPropina() {
    this.acumulador = 0;

    this.pedido.productos.forEach(elemento => {
      if (elemento.nombre != 'propina') {
        this.acumulador = this.acumulador + elemento.precio;
      }
    });
  }

  hacerConsulta() {
    this.router.navigateByUrl('/principal/consultas');
  }

  hacerEncuesta() {
    this.router.navigateByUrl('/principal/ecuesta-cliente');
  }

  confirmarRecepcion() {
    this.pedidoService.actualizarEstado(EstadoPedido.servido, this.pedido.pedidoID);
    setTimeout(() => {
      this.actualizarPedido(this.pedido.id);
    }, 1000);
  }

  pedirCuenta(){
    this.pidioCuenta = true;
  }

  pagar(){
    this.pedidoService.actualizarEstado(EstadoPedido.pagadoSinConfirmar, this.pedido.pedidoID);
  }
}
