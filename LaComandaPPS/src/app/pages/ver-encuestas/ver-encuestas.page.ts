import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EncuestaCliente } from 'src/app/clases/encuesta-cliente';
import { EncuestaService } from 'src/app/servicios/encuesta.service';

@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.page.html',
  styleUrls: ['./ver-encuestas.page.scss'],
})
export class VerEncuestasPage implements OnInit {

  public listadoEncuestasObserver: Observable<EncuestaCliente[]> = null;

  constructor(private encuestasService: EncuestaService) { }

  ngOnInit() {

    this.listadoEncuestasObserver = this.encuestasService.traerTodasLasEncuestas();
  }

}
