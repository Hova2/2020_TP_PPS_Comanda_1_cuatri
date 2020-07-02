import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EncuestaCliente } from 'src/app/clases/encuesta-cliente';
import { EncuestaService } from 'src/app/servicios/encuesta.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  public listadoEncuestasObserver: Observable<EncuestaCliente[]> = null;
  
  public promedioCocinero = 0.0;
  public promedioMozo = 0;
  public promedioRestaurante = 0;
  public promedioMesa = 0;
  public loQueMasGusta = '';
  
  constructor(private encuestasService: EncuestaService) { }

  ngOnInit() {

    this.listadoEncuestasObserver = this.encuestasService.traerTodasLasEncuestas();

    this.listadoEncuestasObserver.subscribe(dato =>{

     

      dato.forEach(element => {

        this.promedioCocinero = this.promedioCocinero + element.puntajeCocina;
        this.promedioMozo = this.promedioMozo + element.puntajeMozo;
        this.promedioRestaurante = this.promedioRestaurante + element.puntajeRestaurant;
        this.promedioMesa = this.promedioMesa + element.puntajeMesa;

        
        
        
      });

      

      this.promedioCocinero = (this.promedioCocinero)/(dato.length);
      this.promedioMozo = this.promedioMozo /(dato.length);
      this.promedioRestaurante = this.promedioRestaurante /(dato.length);
      this.promedioMesa = this.promedioMesa/(dato.length);
     

    })

  }

  

}
