import { Component, OnInit, ɵɵclassMapInterpolate1 } from '@angular/core';
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
  public promedioCocinero100 = 0.0;
  public a: string;
  public b: string;
  public c: string;
  public d: string;
  public promedioMozo = 0;
  public promedioMozo100 = 0;
  public promedioRestaurante = 0;
  public promedioRestaurante100 = 0;
  public promedioMesa = 0;
  public promedioMesa100 = 0;
  public loQueMasGusta = '';
  public limpieza = 0;
  public nada = 0;
  public comida = 0;
  public atencion=0;
  public graficotorta: any;
  public OGT: any;
  public total = 0;

  masGusto: {
    n: number,
    nombre: string
  };
  menosGusto: {
    n: number,
    nombre: string
  };

  constructor(private encuestasService: EncuestaService) { }

  ngOnInit() {

    this.listadoEncuestasObserver = this.encuestasService.traerTodasLasEncuestas();

    this.listadoEncuestasObserver.subscribe(dato => {



      dato.forEach(element => {

        this.promedioCocinero = this.promedioCocinero + element.puntajeCocina;
        this.promedioMozo = this.promedioMozo + element.puntajeMozo;
        this.promedioRestaurante = this.promedioRestaurante + element.puntajeRestaurant;
        this.promedioMesa = this.promedioMesa + element.puntajeMesa;

        if (element.loQueMasGusto === 'Atencion') {
          this.atencion++;
        }
        if (element.loQueMasGusto === 'Limpieza') {
          this.limpieza++;
        }
        if (element.loQueMasGusto === 'Nada') {
          this.nada++;
        }
        if (element.loQueMasGusto === 'Comida') {
          this.comida++;
        }


      });

      this.total = dato.length;

      this.promedioCocinero = Number(((this.promedioCocinero) / (dato.length)).toPrecision(3));
      this.promedioCocinero100 = (this.promedioCocinero / 5);
      if (this.promedioCocinero100 > 0.7) {
        this.a = "success"
      } else if (this.promedioCocinero100 > 0.4) {
        this.a = "warning";
      } else {
        this.a = "danger";
      }

      this.promedioMozo = Number(((this.promedioMozo) / (dato.length)).toPrecision(3));
      this.promedioMozo100 = this.promedioMozo / 5;
      if (this.promedioMozo100 > 0.7) {
        this.b = "success"
      } else if (this.promedioMozo100 > 0.4) {
        this.b = "warning";
      } else {
        this.b = "danger";
      }

      this.promedioRestaurante = Number(((this.promedioRestaurante) / (dato.length)).toPrecision(3));
      this.promedioRestaurante100 = this.promedioRestaurante / 5;
      if (this.promedioRestaurante100 > 0.7) {
        this.c = "success"
      } else if (this.promedioRestaurante100 > 0.4) {
        this.c = "warning";
      } else {
        this.c = "danger";
      }
      this.promedioMesa = Number(((this.promedioMesa) / (dato.length)).toPrecision(3));
      this.promedioMesa100 = this.promedioMesa / 5;
      if (this.promedioMesa100 > 0.7) {
        this.d = "success"
      } else if (this.promedioMesa100 > 0.4) {
        this.d = "warning";
      } else {
        this.d = "danger";
      }

      this.graficotorta = {
        datasets: [
          {
            data: [this.atencion, this.limpieza, this.comida, this.nada],
            backgroundColor: [
              'pink',
              'lightblue',
              'lightgreen',
              'yellow'
            ],
            label: 'Lo que mas gusta'
          }
        ],
        labels: ['Atención','Limpieza','Comida','Nada']
      };
  
      this.OGT = {
        title: {
          display: true,
          text: ""
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };



      

    })

    


  }



}
