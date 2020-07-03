import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { CamaraService } from 'src/app/servicios/camara.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MesaService } from 'src/app/servicios/mesa.service';

@Component({
  selector: 'app-anonimo',
  templateUrl: './anonimo.page.html',
  styleUrls: ['./anonimo.page.scss'],
})
export class AnonimoPage implements OnInit {
  public aF: FormGroup;
  public spinner: boolean = true;
  public fotocliente: string = 'assets/usuario.png';
  public imagenOriginal: string;
  public $rutaFotoAnonimo: Observable<string>;

  constructor(
    private uService: UsuarioService,
    private toastr: ServicioToastService,
    private authService: AuthService,
    private camaraS: CamaraService,
    private router: Router,
    private ms: MesaService
  ) {
    this.$rutaFotoAnonimo = null;
  }

  ngOnInit() {
    timer(3000).subscribe(() => {
      this.spinner = false;
    });

    this.aF = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
  }

  sacarFotoCLiente() {
    this.camaraS.sacarFoto().then((foto) => {
      this.fotocliente = (<any>window).Ionic.WebView.convertFileSrc(foto);
      this.$rutaFotoAnonimo = new Observable((observer) => {
        observer.next(foto);
        observer.complete();
      });
    });
  }

  async volver() {
    const docUsuario = await this.authService.datosUsuarioLoguado();
    const mesa = await this.ms.traerMesaDelCliente(docUsuario.data().id);
    if (mesa !== null) {
      this.router.navigateByUrl('/principal/mi-pedido');
    } else {
      this.router.navigate(['/entrar-mesa']);
    }
  }

  onSubmit() {
    if (this.$rutaFotoAnonimo !== null) {
      this.$rutaFotoAnonimo.subscribe((urlNativaFoto) => {
        this.fotocliente = urlNativaFoto;
      });
    } else {
      this.fotocliente = 'ori';
    }

    let user: Usuario = Usuario.RegistroCliente(
      this.aF.get('name').value,
      '',
      'anonimo@anonimo.com',
      '66666666',
      0,
      this.fotocliente
    );

    this.authService
      .logueoConEmail(user.email, user.password)
      .then(() => {
        this.toastr.mostrarToast('¡Bienvenido!', ColoresToast.success);
        console.log('logueado como: ', user.email, '---', user.password);
        this.uService.updateUser(user);
        this.volver();
      })
      .catch(() => {
        this.toastr.mostrarToast(
          'Usuario o contraseña incorrectos',
          ColoresToast.danger
        );
      });
  }

  borrarCampos() {
    this.aF.get('name').setValue('');
  }
}
