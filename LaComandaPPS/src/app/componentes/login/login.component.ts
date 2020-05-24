import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private email: string = null;
  private password: string = null;

  constructor(private authService: AuthService, private toastr: ServicioToastService) { }

  ngOnInit() { }

  public completarUsuario(parametro: string) {
    switch (parametro) {
      case 'admin':
        this.email = "admin@admin.com";
        this.password = "1111";
        break;
      case 'invitado':
        this.email = "invitado@invitado.com";
        this.password = "2222";
        break;
      case 'usuario':
        this.email = "usuario@usuario.com";
        this.password = "3333";
        break;
      case 'anonimo':
        this.email = "anonimo@anonimo.com";
        this.password = "4444";
        break;
      case 'tester':
        this.email = "tester@tester.com";
        this.password = "5555";
        break;
    }
  }

  public login() {

    this.toastr.mostrarToast('mensaje', ColoresToast.success);

    this.authService.logueoConEmail(this.email, this.password)
      .then(() => {
        this.toastr.mostrarToast('¡Bienvenido!', ColoresToast.success);        
      })
      .catch(() => {
        this.toastr.mostrarToast('Usuario o contraseña incorrectos', ColoresToast.danger);
      });
  }



}
