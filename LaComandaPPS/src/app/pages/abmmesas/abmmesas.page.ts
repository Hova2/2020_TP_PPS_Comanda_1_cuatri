import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { Router } from '@angular/router';
import { timer, Observable } from 'rxjs';
import { Mesa } from 'src/app/clases/mesa';
import { TipoMesa } from 'src/app/enum/tipo-mesa.enum';
import { EstadoMesa } from 'src/app/enum/estado-mesa.enum';
import { MesaService } from 'src/app/servicios/mesa.service';

@Component({
  selector: 'app-abmmesas',
  templateUrl: './abmmesas.page.html',
  styleUrls: ['./abmmesas.page.scss'],
})
export class ABMmesasPage implements OnInit {
  public mesaForm: FormGroup;
  public mesaModificacionForm: FormGroup;
  public spinner: boolean = true;
  public listadoMesasOrserver: Observable<Mesa[]>
  public idMesaSel: string;
  public estadoMesaSel: EstadoMesa;
  public altaradio = true;

  

  constructor(private toastr: ServicioToastService,
    private router: Router,
    private mesaService: MesaService) { }

  ngOnInit() {

    timer(3000).subscribe(() => {
      this.spinner = false;
    });

    this.mesaForm = new FormGroup({
      numero: new FormControl(null, [Validators.required]),
      cantidad: new FormControl(null, [Validators.required]),
      tipoMesa: new FormControl(null, [Validators.required]),
    });

    this.mesaModificacionForm = new FormGroup({
      numeroModificacion: new FormControl(null, [Validators.required]),
      cantidadModificacion: new FormControl(null, [Validators.required]),
      tipoMesaModificacion: new FormControl(null, [Validators.required]),
      deshabilitarModificacion: new FormControl(null),
    });

    this.listadoMesasOrserver = this.mesaService.traerTodasLasMesas();

  }


  borrarCampos(){
    this.mesaForm.get('numero').setValue('');
    this.mesaForm.get('cantidad').setValue('');
    this.mesaForm.get('tipoMesa').setValue('');
  }

  borrarCamposModificacion(){
    this.mesaModificacionForm.get('numeroModificacion').setValue('');
    this.mesaModificacionForm.get('cantidadModificacion').setValue('');
    this.mesaModificacionForm.get('tipoMesaModificacion').setValue('');
    this.mesaModificacionForm.get('deshabilitarModificacion').setValue(false);
  }

 
  mesaSeleccionada(m: Mesa){

    this.idMesaSel = m.id;
    this.estadoMesaSel = m.estadoMesa;
    this.mesaModificacionForm.get('tipoMesaModificacion').setValue(m.tipo);
    this.mesaModificacionForm.get('numeroModificacion').setValue(m.numero);
    this.mesaModificacionForm.get('cantidadModificacion').setValue(String(m.cantidadDePersonas));
    if(m.estadoMesa === 'Deshabilitada'){
      this.mesaModificacionForm.get('deshabilitarModificacion').setValue(true);
    }else{
      this.mesaModificacionForm.get('deshabilitarModificacion').setValue(false);
    }

  }

  onSubmit(){

    let mesa: Mesa = Mesa.altaMesa(
      '',
      this.mesaForm.get('numero').value,
      Number(this.mesaForm.get('cantidad').value),
      this.mesaForm.get('tipoMesa').value,
      EstadoMesa.disponible
    );

    this.mesaService.addMesa(mesa);
    this.borrarCampos();

  }

  onSubmitModificacion(){
    let estado: EstadoMesa;

    if(this.mesaModificacionForm.get('deshabilitarModificacion').value){
      estado = EstadoMesa.deshabilitada;
    }else{
      if(this.estadoMesaSel === EstadoMesa.deshabilitada){
        estado = EstadoMesa.disponible;
      }else{
      estado = this.estadoMesaSel;
      }
    }

    let mesaAux: Mesa = Mesa.altaMesa(
      this.idMesaSel,
      this.mesaModificacionForm.get('numeroModificacion').value,
      this.mesaModificacionForm.get('cantidadModificacion').value,
      this.mesaModificacionForm.get('tipoMesaModificacion').value,
      estado)

     this.mesaService.updateMesa(mesaAux); 

     this.borrarCamposModificacion();

  }

  radioSelect(value){
    if(value === 'alta'){
      this.altaradio = true;
    }else{
      this.altaradio= false;
    }
  }


}
