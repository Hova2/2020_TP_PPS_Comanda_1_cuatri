export class ListaEspera {
  idUsuario: string;
  esperandoEntrar: boolean;
  mesa: string;
  fechaYHora: Date;

  constructor(idUsuario: string) {
    this.idUsuario = idUsuario;
    this.esperandoEntrar = true;
    this.mesa = '';
    this.fechaYHora = new Date();
  }
}
