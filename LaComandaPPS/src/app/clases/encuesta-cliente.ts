import { Pedido } from './pedido';

export class EncuestaCliente {
    id: string;
    puntajeMesa: number;
    puntajeMozo: number;
    puntajeRestaurant: number;
    puntajeCocina: number;
    loQueMasGusto: string;
    comentario: string;
    cliente: string;
    imagen1: string;
    imagen2: string;
    imagen3: string;
    horaAlta: number;

    constructor() {
        this.id = '';
        this.puntajeMesa = 0;
        this.puntajeMozo = 0;
        this.puntajeRestaurant = 0;
        this.puntajeCocina = 0;
        this.loQueMasGusto = '';
        this.comentario = '';
        this.cliente = '';
        this.imagen1 = '';
        this.imagen2 = '';
        this.imagen3='';
        this.horaAlta=0;
    }

    public static crearEncuesta(
       
        puntajeMesa: number,
        puntajeMozo: number,
        puntajeRestaurant: number,
        puntajeCocina: number,
        loQueMasGusto: string,
        comentario: string,
        cliente: string,
        imagen1: string,
        imagen2: string,
        imagen3: string,
        
    ): EncuestaCliente {
        const encuesta = new EncuestaCliente();
        encuesta.id ='';
        encuesta.puntajeMesa = puntajeMesa;
        encuesta.puntajeMozo = puntajeMozo;
        encuesta.puntajeRestaurant = puntajeRestaurant;
        encuesta.puntajeCocina = puntajeCocina;
        encuesta.loQueMasGusto = loQueMasGusto;
        encuesta.comentario = comentario;
        encuesta.cliente = cliente;
        encuesta.imagen1 = imagen1;
        encuesta.imagen2 = imagen2;
        encuesta.imagen3 = imagen3;
        encuesta.horaAlta = Date.now();
        return encuesta;
    }
}
