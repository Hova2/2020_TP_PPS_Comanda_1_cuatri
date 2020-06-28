import { Usuario } from './usuario';
import { TipoComida } from '../enum/tipo-comida.enum';
import { EstadoProducto } from '../enum/estado-producto.enum';
import { QuienElabora } from '../enum/quien-elabora.enum';

export class Producto {
    id: string;
    nombre: string;
    tiempoPromedioDeElaboracion: number;
    descripcion: string;
    precio: number;
    imagen1: string;
    imagen2: string;
    imagen3: string;
    estado: EstadoProducto;
    quienElabora: QuienElabora;


    constructor() {
        this.id = '';
        this.nombre = '';
        this.tiempoPromedioDeElaboracion = 0;
        this.descripcion = '';
        this.precio = 0;
        this.imagen1 = '';
        this.imagen2 = '';
        this.imagen3 = '';
        this.estado = EstadoProducto.pendiente;
        this.quienElabora = null;
    }

    public static crear(
        productoID: string,
        nombre: string,
        imagen1: string,
        imagen2: string,
        imagen3: string,
        precio: number,
        quienElabora: QuienElabora,
        descripcion: string,
        tiempoPromedioDeElaboracion: number
    ) {
        const nuevoProducto = new Producto();
        nuevoProducto.id = productoID;
        nuevoProducto.nombre = nombre;
        nuevoProducto.imagen1 = imagen1;
        nuevoProducto.imagen2 = imagen2;
        nuevoProducto.imagen3 = imagen3;
        nuevoProducto.precio = precio;
        nuevoProducto.quienElabora = quienElabora;
        nuevoProducto.descripcion = descripcion;
        nuevoProducto.tiempoPromedioDeElaboracion = tiempoPromedioDeElaboracion
        return nuevoProducto;
    }
}
