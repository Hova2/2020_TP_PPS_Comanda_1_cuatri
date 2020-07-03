import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { TipoComida } from 'src/app/enum/tipo-comida.enum';
import { EstadoProducto } from 'src/app/enum/estado-producto.enum';
import { QuienElabora } from 'src/app/enum/quien-elabora.enum';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/componentes/popover/popover.component';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Pedido } from 'src/app/clases/pedido';
import { Usuario } from 'src/app/clases/usuario';
import { Rol } from 'src/app/enum/rol.enum';
import { Estados } from 'src/app/enum/estados.enum';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { MesaService } from 'src/app/servicios/mesa.service';
import { Mesa } from 'src/app/clases/mesa';
import { Router } from '@angular/router';
import { QrService } from 'src/app/servicios/qr.service';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { EstadoPedido } from 'src/app/enum/estado-pedido.enum';

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {

  private pedido: Pedido = new Pedido();
  public algoPedido: boolean = false;
  public existePedido = false;
  private esCliente: boolean = true;

  public productos: Observable<any[]> = null;
  public pedidoObservable: Observable<Pedido> = null;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6,
  };

  constructor(
    private popover: PopoverController,
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private as: AuthService,
    private ms: MesaService,
    private router: Router,
    private qrs: QrService,
    private toastr: ServicioToastService
  ) { }

  ngOnInit() {
    this.productos = this.productoService.traerProductosActivos();
    this.inicializarPedido();
  }

  /*private async inicializarPedido(): Promise<void> {
    const docTmp = await this.as.datosUsuarioLoguado();
    const mesa = await this.ms.traerMesaDelCliente(docTmp.id);

    console.log(mesa.idPedido);

    this.pedido = Pedido.crear(mesa.id);
    this.algoPedido = false;
  }*/

  private async inicializarPedido(): Promise<void> {
    const docTmp = await this.as.datosUsuarioLoguado();
    const mesa = await this.ms.traerMesaDelCliente(docTmp.id);

    console.log(mesa)

      if (mesa.idPedido === '') {
        this.pedido = Pedido.crear(mesa.id);
        this.algoPedido = false;
      } else if (mesa.idPedido !== '') {
        this.algoPedido = true;
        /*this.pedidoService.traerPorIdDocumento(mesa.idPedido).then(elPedido => {
          //this.pedido = elPedido;
          this.pedidoService.traerPedidoPorIdDocumento(elPedido.id).then(pedidoDeAca => {
            this.pedido = pedidoDeAca;
          });
        });*/
      }

  }

  private inicializarPedidoDesdeMozo(): void {
    this.pedido = Pedido.crearDesdeMozo();
    this.algoPedido = false;
  }

  public agregarProductoAPedido(producto: Producto): void {
    this.pedido.productos.push(producto);
    this.pedido.total = this.pedidoService.calcularTotal(this.pedido);
    this.algoPedido = true;
  }

  async mostrarPedido() {
    const popover = await this.popover.create({
      component: PopoverComponent,
      showBackdrop: true,
      componentProps: { pedido: this.pedido },
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data) {
      this.hacerPedido();
    } else if (data === false) {
      this.cancelarPedido();
    }
  }

  public async hacerPedido(): Promise<void> {
    if (this.pedido.mesaID === 'No hay') {
    } else {
      if (this.pedidoService.verificarPedido(this.pedido)) {
        this.pedido.empleado = await this.seleccionarMozo();
        const docTmp = await this.as.datosUsuarioLoguado();
        let usuarioTmp = docTmp.data() as Usuario;
        usuarioTmp.id = docTmp.id;
        this.pedido.cliente = usuarioTmp;
        const idPedido = await this.pedidoService.agregarPedido(this.pedido);
        this.ms.actualizarMesaConIdPedido(this.pedido.mesaID, idPedido);
        this.pedidoService.actualizarPedidoConIdPedido(idPedido);
        this.existePedido = true;
      } else {
      }
    }
  }

  cancelarPedido() {
    this.pedido.productos = new Array<Producto>();

    this.algoPedido = false;
    this.pedido.productos = [];
    this.pedido.total = this.pedidoService.calcularTotal(this.pedido);
    this.inicializarPedido();
  }

  private seleccionarMozo(): Promise<Usuario> {
    return this.usuarioService.traerTodosLosMozos().then((mozos) => {
      const random = Math.floor(Math.random() * mozos.length);
      return mozos[random];
    });
  }

  hacerConsulta() {
    this.router.navigateByUrl('/principal/consultas');
  }




}
