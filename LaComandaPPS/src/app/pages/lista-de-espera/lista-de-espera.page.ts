import { Component, OnInit } from '@angular/core';
import { ListaEsperaService } from 'src/app/servicios/lista-espera.service';
import { Observable } from 'rxjs';
import { MesaService } from 'src/app/servicios/mesa.service';
import { ListaEspera } from 'src/app/clases/lista-espera';

@Component({
  selector: 'app-lista-de-espera',
  templateUrl: './lista-de-espera.page.html',
  styleUrls: ['./lista-de-espera.page.scss'],
})
export class ListaDeEsperaPage implements OnInit {
  listaDeEspera: Observable<any[]>;
  listaDeMesasDisponibles: Observable<any[]>;

  constructor(private le: ListaEsperaService, private ms: MesaService) {
    this.listaDeEspera = this.le.listarEsperandoEntrar();
    this.listaDeMesasDisponibles = this.ms.listarDisponibles();

  }

  ngOnInit() {}

  public async aceptar(mesa: any, listaE: any){
    const mesaTmp = await this.ms.traerIdMesaConNumero(mesa);
    this.le.actualizar(listaE.id, mesaTmp.id);
  }
}
