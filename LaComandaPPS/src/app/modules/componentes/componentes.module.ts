import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPedidosComponent } from 'src/app/componentes/lista-pedidos/lista-pedidos.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EstadoPedidoComponent } from 'src/app/componentes/estado-pedido/estado-pedido.component';
import { FiltrarProductoPipe } from 'src/app/pipes/filtrar-producto.pipe';

@NgModule({
  declarations: [
    ListaPedidosComponent,
    EstadoPedidoComponent,
    FiltrarProductoPipe,
  ],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [ListaPedidosComponent, FiltrarProductoPipe],
  entryComponents: [EstadoPedidoComponent],
})
export class ComponentesModule {}
