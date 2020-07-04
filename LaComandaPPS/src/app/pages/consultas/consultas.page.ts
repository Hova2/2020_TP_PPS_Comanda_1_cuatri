import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Rol } from 'src/app/enum/rol.enum';
import { Estados } from 'src/app/enum/estados.enum';
import { Pedido } from 'src/app/clases/pedido';
import { EstadoPedido } from 'src/app/enum/estado-pedido.enum';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { Mensaje } from 'src/app/clases/mensaje';
import { MensajeService } from 'src/app/servicios/mensaje.service';
import { Observable } from 'rxjs';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { MesaService } from 'src/app/servicios/mesa.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Mesa } from 'src/app/clases/mesa';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  // private usuarioActivo: Usuario = {
  //   id: 'id',
  //   dni: 0,
  //   nombre: 'Mozo',
  //   apellido: 'apellido',
  //   password: '',
  //   email: '',
  //   rol: Rol.mozo,
  //   imagen: '',
  //   eliminado: false,
  //   estado: Estados.habilitado,
  // };

  private usuarioActivo: Usuario = new Usuario;
  private mesa: Mesa;

  // private empleadoActivo: Usuario = {
  //   id: 'id',
  //   dni: 0,
  //   nombre: 'Mozo',
  //   apellido: 'apellido',
  //   password: '',
  //   email: '',
  //   rol: Rol.mozo,
  //   imagen: '',
  //   eliminado: false,
  //   estado: Estados.habilitado,
  // };

  //private pedido: Pedido;
  private form: FormGroup;
  private formSelect: FormGroup;
  private hayConsultasCliente: boolean = false;
  private spinner: boolean = true;
  public mensajes: Observable<any[]> = null;
  private mensajeSeleccionado: Mensaje = null;

  constructor(private formBuilder: FormBuilder,
    private toast: ServicioToastService,
    private mensajeService: MensajeService,
    private mesaService: MesaService,
    private authService: AuthService) {
    // this.pedido = new Pedido();
    // this.pedido.empleado = this.empleadoActivo;
    // this.pedido.mesaID = "numeroDeMesa";
  }

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  ngOnInit() {
    setTimeout(() => {
      this.spinner = false;
    }, 3000);
    this.form = this.formBuilder.group({
      pregunta: ['', Validators.required],
      respuesta: ['']
    });
    this.formSelect = this.formBuilder.group({
      select: [null]
    });

    this.authService.datosUsuarioLoguado().then(usuario =>{
      this.usuarioActivo = usuario.data() as Usuario;
    }).then(()=>{
      if (this.usuarioActivo.rol == Rol.cliente) {
        this.mensajes = this.mensajeService.traerMisMensajes(this.usuarioActivo.nombre);
        setTimeout(() => {
          this.mensajes.subscribe(mensajeria => {
            console.log(mensajeria.length);
            if (mensajeria.length > 0) {
              this.hayConsultasCliente = true;
              mensajeria.forEach(element => {
                console.log(element);
              });
            }
          })
        }, 1000);
      } else if (this.usuarioActivo.rol == Rol.mozo) {
        //this.mensajes = this.mensajeService.traerMisMensajesParaResponder(this.usuarioActivo.nombre);
        this.mensajes = this.mensajeService.traerMisMensajesParaResponder();
        setTimeout(() => {
          this.mensajes.subscribe(mensajeria => {
            console.log(mensajeria.length);
            if (mensajeria.length > 0) {
              this.hayConsultasCliente = true;
              mensajeria.forEach(element => {
                console.log(element);
              });
            }else if(mensajeria.length == 0){
              this.hayConsultasCliente = false;
            }
          })
        }, 1000);
      }

      this.mesaService.traerMesaDelCliente(this.usuarioActivo.id).then(mesaDU=>{
        this.mesa = mesaDU;
      });
    });
  }

  logForm() {
    if (this.usuarioActivo.rol == Rol.cliente) {
      this.hacerConsulta();
    } else if (this.usuarioActivo.rol == Rol.mozo) {
      this.responderConsulta();
    }
  }

  responderConsulta() {
    this.mensajeService.responderMensaje(this.mensajeSeleccionado.id, this.form.value.pregunta).then(valor => {
      if (valor) {
        this.toast.mostrarToast("Mensaje Respondido", ColoresToast.success);
        this.cancelar();
      } else {
        this.toast.mostrarToast("Error al responder el mensaje", ColoresToast.danger);
      }
    });
  }

  async hacerConsulta() {
    
    const mesa = await this.mesaService.traerMesaDelCliente(this.usuarioActivo.id);

    let mensaje: Mensaje;

    mensaje = Mensaje.crear(
      '',
      this.usuarioActivo.nombre,
      "this.empleadoActivo.nombre",
      this.form.value.pregunta,
      this.mesa.numero
      //this.pedido.mesaID
    )

    this.mensajeService.persistirMensaje(mensaje).then(valor => {
      if (valor) {
        this.cancelar();
        this.toast.mostrarToast('Mensaje enviado', ColoresToast.success);
      } else {
        this.toast.mostrarToast('Error, reintente luego', ColoresToast.danger);
      }
    });
  }

  public cancelar(): void {
    this.form.reset();
    this.formSelect.controls.select.setValue(null);
    setTimeout(() => {
    this.mensajeSeleccionado = null;
    }, 1000  );

  }

  public cargarMensaje() {

    let id = this.formSelect.value.select;

    if (id == null) {
      this.cancelar();
    } else {
      console.log(id);
      this.mensajeService.traerMensajePorId(id).then(mensaje => {

        this.mensajeSeleccionado = mensaje;

      });

    }
  }




}
