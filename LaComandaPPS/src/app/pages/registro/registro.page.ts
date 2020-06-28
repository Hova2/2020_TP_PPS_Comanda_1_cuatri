import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { timer } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { QrService } from 'src/app/servicios/qr.service';
import { Router } from '@angular/router';
import { CamaraService } from 'src/app/servicios/camara.service';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public registerForm: FormGroup;
  public spinner: boolean = true;
  public datosDNI: string[];
  public fotocliente: string = 'assets/usuario.png';
 // public imagenOriginal: string;
  public $rutaFoto: Observable<string>;

  constructor(
    private authService: AuthService,
    private toastr: ServicioToastService,
    private qr: QrService,
    private camaraS: CamaraService,
    private router: Router
  ) {
    this.$rutaFoto = null;
  }

  ngOnInit() {
    timer(3000).subscribe(() => {
      this.spinner = false;
    });

    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      dni: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  escanearCodigo() {
    this.qr.EscanearDNI().then((barcodeData) => {
      const codigoEscaneado = barcodeData.text.split('@', 6);


      if( isNaN((Number(codigoEscaneado[1]))) ){

      //alert("dni juan")
      this.registerForm.get('name').setValue(codigoEscaneado[2]);
      this.registerForm.get('lastname').setValue(codigoEscaneado[1]);
      this.registerForm.get('dni').setValue(codigoEscaneado[4]);

      }else{
        //alert("dni ariel");
        this.registerForm.get('name').setValue(codigoEscaneado[5]);
        this.registerForm.get('lastname').setValue(codigoEscaneado[4]);
        this.registerForm.get('dni').setValue(codigoEscaneado[1]);

      }
    });
  }




  borrarCampos() {
    this.registerForm.get('name').setValue('');
    this.registerForm.get('lastname').setValue('');
    this.registerForm.get('dni').setValue('');
    this.registerForm.get('email').setValue('');
    this.registerForm.get('password').setValue('');
  }

  sacarFotoCLiente() {
    this.camaraS.sacarFoto().then((foto) => {
      this.fotocliente = (<any>window).Ionic.WebView.convertFileSrc(foto);
      this.$rutaFoto = new Observable((observer) => {
        observer.next(foto);
        observer.complete();
      });
    });
  }

  volver() {
    this.router.navigate(['']);
  }

  onSubmit() {
    if (this.$rutaFoto !== null) {
      this.$rutaFoto.subscribe((urlNativaFoto) => {
        this.fotocliente = urlNativaFoto;
      });
    } else {
      this.fotocliente = 'ori';
    }

    let user: Usuario = Usuario.RegistroCliente(
      this.registerForm.get('name').value,
      this.registerForm.get('lastname').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      this.registerForm.get('dni').value,
      this.fotocliente
    );

    this.authService
      .RegisterWithEmail(user)
      .then(() => {
        this.toastr.mostrarToast(
          'Te has registrado con éxito.',
          ColoresToast.success
        );
        console.log('alta exitosa');
        this.borrarCampos();
        this.volver();
      })
      .catch((error) => {
        this.toastr.mostrarToast('Ha ocurrido un error.', ColoresToast.danger);
        console.log('terrible error');
      });
  }
}
