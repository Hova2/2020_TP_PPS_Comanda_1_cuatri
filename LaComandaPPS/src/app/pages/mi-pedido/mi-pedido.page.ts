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

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {

  private pedido: Pedido = null;
  public algoPedido: boolean;
  public existePedido = false;
  private esCliente: boolean = true;


  private usuarioActual: Usuario = {
    id: 'id',
    dni: 0,
    nombre: 'raul',
    apellido: 'apellido',
    password: '',
    email: '',
    rol: Rol.cliente,
    imagen: '',
    eliminado: false,
    estado: Estados.habilitado,
  };
  private empleadoActual: Usuario = {
    id: 'id',
    dni: 0,
    nombre: 'raul',
    apellido: 'apellido',
    password: '',
    email: '',
    rol: Rol.mozo,
    imagen: '',
    eliminado: false,
    estado: Estados.habilitado,
  };

  public productos: Observable<any[]> = null;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  constructor(private popover: PopoverController,
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,) { }

  ngOnInit() {

    this.productos = this.productoService.traerProductosActivos();
    this.pedido = Pedido.crear("mesa1");

    if(this.usuarioActual.rol == "mozo"){
      this.esCliente = false;
      this.inicializarPedidoDesdeMozo();
    }else if(this.usuarioActual.rol == "cliente"){
      this.esCliente = true;
      this.inicializarPedido();
    }
  }

  private inicializarPedido(): void {
    // this.ms.buscarDisponible().then(mesa => {
    //   this.pedido = Pedido.crear(mesa.mesaID);
    //   this.algoPedido = false;
    // });


    //esto es hardcodeado
    this.pedido = Pedido.crear("mesa.mesaID");
    this.algoPedido = false;
  }

  private inicializarPedidoDesdeMozo(): void {
    // this.ms.buscarDisponible().then(mesa => {
    //   this.pedido = Pedido.crear(mesa.mesaID);
    //   this.algoPedido = false;
    // });


    //esto es hardcodeado
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
      componentProps: { pedido: this.pedido }
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();

    console.log(data);

    if (data) {
      this.hacerPedido();
    } else if (data === false) {
      this.cancelarPedido()
    }
  }

  public hacerPedido(): void {
    if (this.pedido.mesaID === 'No hay') {
    } else {
      if (this.pedidoService.verificarPedido(this.pedido)) {
        this.pedido.empleado = this.empleadoActual;
        this.pedido.cliente = this.usuarioActual;

        // this.mesaService.actualizarEstado(
        //   this.pedido.mesaID,
        //   EstadoMesa.esperandoPedido
        // );

        this.pedidoService.agregarPedido(this.pedido);
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
    return this.usuarioService.traerTodosLosMozos().then(mozos => {
      const random = Math.floor(Math.random() * mozos.length);
      return mozos[random];
    });
  }
}
