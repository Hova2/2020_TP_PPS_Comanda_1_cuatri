export class Mensaje {
    id: string;
    nombreUsuario: string;
    nombreMozo: string;
    pregunta: string;
    respuesta: string;
    fecha: number;
    mesa: string;

    constructor() {
        this.id = '';
        this.nombreUsuario = '';
        this.nombreMozo = '';
        this.pregunta = '';
        this.respuesta = '';
        this.fecha = null;
        this.mesa = '';
    }

    public static crear(
        id: string,
        nombreUsuario: string,
        nombreMozo: string,
        pregunta: string,
        mesa: string
    ) {

        const nuevoMensaje = new Mensaje();

        nuevoMensaje.id = id;
        nuevoMensaje.nombreUsuario = nombreUsuario;
        nuevoMensaje.nombreMozo = nombreMozo;
        nuevoMensaje.pregunta = pregunta;
        nuevoMensaje.respuesta = null;
        nuevoMensaje.mesa = mesa;
        nuevoMensaje.fecha = Date.now();

        return nuevoMensaje;

    }

}
