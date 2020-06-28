import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificacionesPushService } from 'src/app/servicios/notificaciones-push.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Platform, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formulario: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ServicioToastService,
    private router: Router,
    private np: NotificacionesPushService,
    private platform: Platform,
    private tc: ToastController
  ) {
    this.formulario = new FormGroup({
      usuario: new FormControl(null, [Validators.required]),
      clave: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {}

  public completarUsuario(parametro: string) {
    switch (parametro) {
      case 'cocinero':
        this.formulario.controls.usuario.setValue('cocinero@cocinero.com');
        this.formulario.controls.clave.setValue('00000000');
        break;
      case 'bartender':
        this.formulario.controls.usuario.setValue('bartender@bartender.com');
        this.formulario.controls.clave.setValue('11111111');
        break;
      case 'cliente':
        this.formulario.controls.usuario.setValue('cliente@cliente.com');
        this.formulario.controls.clave.setValue('22222222');
        break;
      case 'socio':
        this.formulario.controls.usuario.setValue('socio@socio.com');
        this.formulario.controls.clave.setValue('33333333');
        break;
      case 'mozo':
        this.formulario.controls.usuario.setValue('mozo@mozo.com');
        this.formulario.controls.clave.setValue('44444444');
        break;
      case 'metre':
        this.formulario.controls.usuario.setValue('metre@metre.com');
        this.formulario.controls.clave.setValue('55555555');
        break;
    }
  }

  public login() {
    this.toastr.mostrarToast('mensaje', ColoresToast.success);

    this.authService
      .logueoConEmail(
        this.formulario.controls.usuario.value,
        this.formulario.controls.clave.value
      )
      .then(async (datosUsuario) => {
        const docUsuario = await this.authService.datosUsuarioLoguado();
        const rol = docUsuario.data().rol;
        this.initializeApp();
        switch (rol) {
          case 'cliente':
            this.router.navigate(['/entrar-mesa']);
            break;
          case 'metre':
            this.router.navigate(['/principal/lista-de-espera']);
            break;
          default:
            this.router.navigate(['/principal']);
            break;
        }
        this.toastr.mostrarToast('¡Bienvenido!', ColoresToast.success);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.mostrarToast(
          'Usuario o contraseña incorrectos',
          ColoresToast.danger
        );
      });
  }

  public register() {
    //this.toastr.mostrarToast('Registro de nuevo usuario', ColoresToast.tertiary);
    this.router.navigate(['/registro']);
  }

  public anonimo() {
    this.router.navigate(['/anonimo']);
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.np.getToken();

      this.np
        .escuchardorDeNotificaciones()
        .pipe(
          tap((msg) => {
            const toast = this.tc.create({
              message: msg.body,
              duration: 3000,
            });
            toast.then((t) => {
              t.present();
            });
          })
        )
        .subscribe();
    });
  }
}
