import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MesaService } from 'src/app/servicios/mesa.service';

@Component({
  selector: 'app-lista-mesas-disponibles',
  templateUrl: './lista-mesas-disponibles.page.html',
  styleUrls: ['./lista-mesas-disponibles.page.scss'],
})
export class ListaMesasDisponiblesPage implements OnInit {
  public listaDeMesas: Observable<any[]>;

  constructor(private ms: MesaService) {}

  ngOnInit() {
    this.listaDeMesas = this.ms.traerTodasLasMesas();
  }
}
