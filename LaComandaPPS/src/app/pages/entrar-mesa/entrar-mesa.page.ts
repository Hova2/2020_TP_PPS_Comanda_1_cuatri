import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { QrService } from 'src/app/servicios/qr.service';
import { ListaEspera } from 'src/app/clases/lista-espera';
import { ListaEsperaService } from 'src/app/servicios/lista-espera.service';
import { Observable } from 'rxjs';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { MesaService } from 'src/app/servicios/mesa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar-mesa',
  templateUrl: './entrar-mesa.page.html',
  styleUrls: ['./entrar-mesa.page.scss'],
})
export class EntrarMesaPage implements OnInit {
  public titulo: string;
  public fotoUsuario: string;
  public idUsuario: string;
  public nombreUsuario: string;
  public apellidoUsuario: string;
  public email: string;
  public esperando: string;
  public estadoUsuario: string;
  public datosLista: any;
  public esperandoEntrada: boolean;

  constructor(
    private as: AuthService,
    private qrs: QrService,
    private les: ListaEsperaService,
    private toastr: ServicioToastService,
    private ms: MesaService,
    private router: Router
  ) {
    this.titulo = 'Solicitar ingreso';
    this.esperando = 'Ingresar a la lista de espera';
    this.esperandoEntrada = true;
    this.as
      .datosUsuarioLoguado()
      .then((docUsuario) => {
        this.fotoUsuario = docUsuario.data().imagen;
        this.estadoUsuario = docUsuario.data().estado;
        this.idUsuario = docUsuario.id;
        this.nombreUsuario = docUsuario.data().nombre;
        this.apellidoUsuario = docUsuario.data().apellido;
        this.email = docUsuario.data().email;
        return docUsuario.id;
      })
      .then((idUsuario) => {
        this.les.existeUsuarioEnLista(idUsuario).subscribe(async (datos) => {
          this.datosLista = datos;
          if (datos) {
            this.esperando = 'Aguarde para acceder al local';
            if (!datos.esperandoEntrar) {
              this.esperandoEntrada = false;
              this.esperando = 'Ingresar la mesa';
            }
          }
        });
      });
  }

  ngOnInit() {}

  public async escanearQREntrada() {
    const resultado = await this.qrs.escanear();
    console.log(this.nombreUsuario);

    switch (resultado.text) {
      case 'entrada':
        const listaEspera = new ListaEspera(
          this.idUsuario,
          this.nombreUsuario,
          this.apellidoUsuario,
          this.email
        );
        this.les.alta(listaEspera);
        break;
      default:
        this.toastr.mostrarToast('Codigo incorrecto', ColoresToast.danger);
        break;
    }
  }

  public async escanearQRMesa() {
    const resultado = await this.qrs.escanear();
    const usuario = await this.as.datosUsuarioLoguado();
    const leTmp = await this.les.existeUsuarioEnListaPromesa(usuario.id);

    if (resultado.text === leTmp.mesa) {
      this.ms.actualizarIdUsuario(leTmp.mesa, usuario.id).then(() => {
        this.les.baja(leTmp.id);
        this.router.navigateByUrl('/principal/mi-pedido');
      });
    } else {
      this.toastr.mostrarToast('Mesa incorrecta', ColoresToast.danger);
    }
  }

  public desloguearse() {
    this.as.logout();
    this.router.navigateByUrl('');
  }
}
