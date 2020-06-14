import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { TipoComida } from 'src/app/enum/tipo-comida.enum';
import { EstadoProducto } from 'src/app/enum/estado-producto.enum';
import { QuienElabora } from 'src/app/enum/quien-elabora.enum';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/componentes/popover/popover.component';

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {

  pedido = new Array<Producto>();

  productos: Producto[] = [
    {
      productoID: 'IDProd1',
      nombre: 'nombreProd1',
      imagen: ['../../../assets/imagenes/comida1.jpg', '../../../assets/imagenes/comida2.jpg', '../../../assets/imagenes/comida3.jpg'],
      precio: 11,
      tipoComida: [TipoComida.comida, TipoComida.vegano],
      estado: EstadoProducto.pendiente,
      quienElabora: QuienElabora.cocinero,
      descripcion: 'descripcionProd1',
      tiempoPromedioDeElaboracion: 1
    },
    {
      productoID: 'IDProd2',
      nombre: 'nombreProd2',
      imagen: ['../../../assets/imagenes/comida4.jpg', '../../../assets/imagenes/comida5.jpg', '../../../assets/imagenes/comida6.jpg'],
      precio: 22,
      tipoComida: [TipoComida.bebida, TipoComida.alcohol],
      estado: EstadoProducto.pendiente,
      quienElabora: QuienElabora.bartender,
      descripcion: 'descripcionProd2',
      tiempoPromedioDeElaboracion: 2
    }
  ];

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  constructor(private popover: PopoverController) { }

  ngOnInit() {
  }


  agregar(producto: Producto) {
    this.pedido.push(producto);
    console.log(this.pedido.length);
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

   hacerPedido() {
     console.log("hacerPedido()");
   }

   cancelarPedido() {
     console.log("cancelarPedido()");
   }
}
