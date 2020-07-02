import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { CamaraService } from 'src/app/servicios/camara.service';
import { EncuestaCliente } from 'src/app/clases/encuesta-cliente';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecuesta-cliente',
  templateUrl: './ecuesta-cliente.page.html',
  styleUrls: ['./ecuesta-cliente.page.scss'],
})
export class EcuestaClientePage implements OnInit {

  public imagen1: string = null;
  public imagen2: string = null;
  public imagen3: string = null;
  public imagen1tmp: string = null;
  public imagen2tmp: string = null;
  public imagen3tmp: string = null;

  public encuestaForm: FormGroup;

  constructor(private encuestaService: EncuestaService,
    private cs:CamaraService,
    private toast: ServicioToastService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {


    this.encuestaForm = new FormGroup({
      estadoMesa: new FormControl(null, [Validators.required]),
      mozo: new FormControl(null, [Validators.required]),
      cocinero: new FormControl(null, [Validators.required]),
      servicioGral: new FormControl(null, [Validators.required]),
      queTeGusto: new FormControl(null, [Validators.required]),
      areaComentario: new FormControl(null),     
     
    });


  }

  sacarFoto(imagen: string) {
    switch (imagen) {
      case 'imagen1':
        this.cs.sacarFoto().then(foto => {
          this.imagen1 = foto;
          this.cs.formatearImageData(foto).then(imgFormat => {
            this.imagen1tmp = imgFormat;
          });
        });
        break;
      case 'imagen2':
        this.cs.sacarFoto().then((foto) => {
          this.imagen2 = foto;
          this.cs.formatearImageData(foto).then(imgFormat => {
            this.imagen2tmp = imgFormat;
          });
        });
        break;
      case 'imagen3':
        this.cs.sacarFoto().then((foto) => {
          this.imagen3 = foto;
          this.cs.formatearImageData(foto).then(imgFormat => {
            this.imagen3tmp = imgFormat;
          });
        });
        break;
    }
  }

  async onSubmit(){

    let encuesta: EncuestaCliente;

    if (this.imagen1 === null) {      
      this.imagen1 = '../../../assets/imagenes/imagenSubirProducto.png';
     }
     if (this.imagen2 === null) {
       this.imagen2 = '../../../assets/imagenes/imagenSubirProducto.png';
     }
     if (this.imagen3 === null) {
       this.imagen3 = '../../../assets/imagenes/imagenSubirProducto.png';
     }

     const docUsuario = await this.authService.datosUsuarioLoguado();
     const email = docUsuario.data().email;

     encuesta = EncuestaCliente.crearEncuesta(
      Number(this.encuestaForm.get('estadoMesa').value),
      Number(this.encuestaForm.get('mozo').value),
      Number(this.encuestaForm.get('servicioGral').value),
      Number(this.encuestaForm.get('cocinero').value),
      this.encuestaForm.get('queTeGusto').value,
      this.encuestaForm.get('areaComentario').value,
      email,
      this.imagen1,
      this.imagen2,
      this.imagen3)

      this.encuestaService.addEncuestaCliente(encuesta).then((valor) => {
        if (valor) {
          this.cancelar();
          this.toast.mostrarToast('Alta exitosa', ColoresToast.success);
        } else {
          this.toast.mostrarToast('Error', ColoresToast.danger);
        }
      });

  }

  public cancelar(): void {
    this.encuestaForm.get('estadoMesa').setValue(null);
    this.encuestaForm.get('mozo').setValue(null);
    this.encuestaForm.get('servicioGral').setValue(null);
    this.encuestaForm.get('cocinero').setValue(null);
    this.encuestaForm.get('queTeGusto').setValue('Nada');
    this.encuestaForm.get('areaComentario').setValue('');
    this.imagen1=null;
    this.imagen2=null;
    this.imagen3=null;
    this.imagen1tmp = null;
    this.imagen2tmp = null;
    this.imagen3tmp = null;
  }

  mostrarencuestas() {
    this.router.navigate(['/estadisticas']);
  }
  
}
