import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ColoresToast } from '../enum/colores-toast.enum';

@Injectable({
  providedIn: 'root'
})
export class ServicioToastService {

  constructor(private toastr: ToastController) { }

  async mostrarToast(mensaje: string, color: ColoresToast) {
    let toast = await this.toastr.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: "bottom"
    });
    toast.present();
  }
}


