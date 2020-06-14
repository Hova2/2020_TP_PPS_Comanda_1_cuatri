import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Producto } from 'src/app/clases/producto';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  pedido: Producto[];

  constructor(private popoverController: PopoverController, private navParams: NavParams) {
    this.pedido = this.navParams.get('pedido');
   }

  ngOnInit() {}

  cerrarPopover(valor){    
    console.log(valor);
    this.popoverController.dismiss(
      valor
    );
  }

}
