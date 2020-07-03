export class ListaEspera {
  idUsuario: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  email: string;
  esperandoEntrar: boolean;
  mesa: string;
  fechaYHora: Date;

  constructor(
    idUsuario: string,
    nombreUsuario: string,
    apellidoUsuario: string,
    email: string
  ) {
    this.idUsuario = idUsuario;
    this.nombreUsuario = nombreUsuario;
    this.apellidoUsuario = apellidoUsuario;
    this.email = email;
    this.esperandoEntrar = true;
    this.mesa = '';
    this.fechaYHora = new Date();
  }
}
