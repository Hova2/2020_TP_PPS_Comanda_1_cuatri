import { Pedido } from './pedido';

export class EncuestaCliente {
    id: string;
    pedido: Pedido;
    puntajeMesa: number;
    puntajeMozo: number;
    puntajeRestaurant: number;
    puntajeEmpleados: number;
    comentario: string;
    tipoComentario: boolean;

    constructor() {
        this.puntajeMesa = 0;
        this.puntajeMozo = 0;
        this.puntajeRestaurant = 0;
        this.puntajeEmpleados = 0;
    }

    public static crear(
        pedido: Pedido,
        puntajeMesa: number,
        puntajeMozo: number,
        puntajeRestaurant: number,
        puntajeEmpleados: number,
        comentario: string,
        tipoComentario: boolean
    ): EncuestaCliente {
        const encuesta = new EncuestaCliente();
        encuesta.pedido = pedido;
        encuesta.puntajeMesa = puntajeMesa;
        encuesta.puntajeMozo = puntajeMozo;
        encuesta.puntajeRestaurant = puntajeRestaurant;
        encuesta.puntajeEmpleados = puntajeEmpleados;
        encuesta.comentario = comentario;
        encuesta.tipoComentario = tipoComentario;
        return encuesta;
    }
}
