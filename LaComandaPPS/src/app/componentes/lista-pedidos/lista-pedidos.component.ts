import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/clases/pedido';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { EstadoPedido } from 'src/app/enum/estado-pedido.enum';
import { ModalController } from '@ionic/angular';
import { EstadoPedidoComponent } from '../estado-pedido/estado-pedido.component';
import { MesaService } from 'src/app/servicios/mesa.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss'],
})
export class ListaPedidosComponent implements OnInit {
  public listaPedidos: Observable<Pedido[]>;
  public rol: string;

  constructor(
    private ps: PedidoService,
    private as: AuthService,
    public modcon: ModalController,
    public ms: MesaService
  ) {}

  ngOnInit() {
    this.as.datosUsuarioLoguado().then((docUsuario) => {
      this.rol = docUsuario.data().rol;
      switch (this.rol) {
        case 'mozo':
          this.listaPedidos = this.ps.listarPedidosMozo(docUsuario.id);
          break;
        case 'cocinero':
        case 'bartender':
          this.listaPedidos = this.ps.listarPedidosQuienPrepara(this.rol);
          break;
      }
    });
  }

  public mozoCancelar(pedido: Pedido) {
    pedido.estado = EstadoPedido.cancelado;
    this.ps.actualizar(pedido);
  }

  public mozoAprueba(pedido: Pedido) {
    pedido.estado = EstadoPedido.pendiente;
    this.ps.actualizar(pedido);
  }

  public servir(pedido: Pedido) {
    pedido.estado = EstadoPedido.servidoSinConfirmar;
    this.ps.actualizar(pedido);
  }

  public confirmarPago(pedido: Pedido) {
    pedido.estado = EstadoPedido.pagado;
    this.ps.actualizar(pedido);
    this.ms.liberarMesa(pedido.mesaID);
  }

  public async verPedido(pedido: Pedido) {
    const modal = await this.modcon.create({
      component: EstadoPedidoComponent,
      showBackdrop: true,
      componentProps: { pedido: pedido },
    });
    await modal.present();
  }
}
