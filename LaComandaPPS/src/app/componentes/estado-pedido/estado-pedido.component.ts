import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/clases/pedido';
import { Producto } from 'src/app/clases/producto';
import { EstadoProducto } from 'src/app/enum/estado-producto.enum';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-estado-pedido',
  templateUrl: './estado-pedido.component.html',
  styleUrls: ['./estado-pedido.component.scss'],
})
export class EstadoPedidoComponent implements OnInit {
  public pedido: Pedido;
  public sliderConfig: any;
  public rol: string;

  constructor(
    public modcon: ModalController,
    private np: NavParams,
    private ps: PedidoService,
    private as: AuthService
  ) {}

  ngOnInit() {
    this.pedido = Object.assign(new Pedido(), this.np.get('pedido'));
    this.sliderConfig = {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 1.6,
    };
    this.as.datosUsuarioLoguado().then((docUsuario) => {
      this.rol = docUsuario.data().rol;
    });
  }

  public comenzarAPreparar(producto: Producto) {
    producto.estado = EstadoProducto.preparandose;
    this.pedido.actualizarEstadoDePedido();
    this.ps.actualizar(this.pedido);
  }

  public listoParaServir(producto: Producto) {
    producto.estado = EstadoProducto.terminando;
    this.pedido.actualizarEstadoDePedido();
    this.ps
      .actualizar(this.pedido)
      .then(() => {})
      .catch(() => {});
  }

  public salir() {
    this.modcon.dismiss();
  }
}
