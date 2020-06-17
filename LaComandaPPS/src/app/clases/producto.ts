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
    imagenes: Array<any>;
    estado: EstadoProducto;
    quienElabora: QuienElabora;


    constructor() {
        this.id = '';
        this.nombre = '';        
        this.tiempoPromedioDeElaboracion = 0;
        this.descripcion = '';
        this.precio = 0;
        this.imagenes = null;
        this.estado = EstadoProducto.pendiente;
        this.quienElabora = null;
    }

    public static crear(
        productoID: string,
        nombre: string,
        imagenes: Array<any>,
        precio: number,
        quienElabora: QuienElabora,
        descripcion: string,
        tiempoPromedioDeElaboracion: number
    ) {
        const nuevoProducto = new Producto();
        nuevoProducto.id = productoID;
        nuevoProducto.nombre = nombre;
        nuevoProducto.imagenes = imagenes;
        nuevoProducto.precio = precio;
        nuevoProducto.quienElabora = quienElabora;
        nuevoProducto.descripcion = descripcion;
        nuevoProducto.tiempoPromedioDeElaboracion = tiempoPromedioDeElaboracion
        return nuevoProducto;
    }
}
