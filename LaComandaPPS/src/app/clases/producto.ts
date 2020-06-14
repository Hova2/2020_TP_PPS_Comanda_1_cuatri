import { Usuario } from './usuario';
import { TipoComida } from '../enum/tipo-comida.enum';
import { EstadoProducto } from '../enum/estado-producto.enum';
import { QuienElabora } from '../enum/quien-elabora.enum';

export class Producto {
    productoID: string;
    nombre: string;
    imagen: Array<any>;
    precio: number;
    tipoComida?: TipoComida[];
    estado: EstadoProducto;
    quienElabora: QuienElabora;
    empleado?: Usuario;
    descripcion: string;
    tiempoPromedioDeElaboracion: number;

    constructor() {
        this.productoID = '';
        this.nombre = '';
        this.imagen = null;
        this.precio = 0;
        this.tipoComida = null;
        this.estado = EstadoProducto.pendiente;
        this.quienElabora = null;
        this.descripcion = '';
        this.tiempoPromedioDeElaboracion = 0;
    }

    public static crear(
        productoID: string,
        nombre: string,
        imagen: Array<any>,
        precio: number,
        //tipoComida: TipoComida[],
        quienElabora: QuienElabora,
        descripcion: string,
        tiempoPromedioDeElaboracion: number
    ) {
        const nuevoProducto = new Producto();
        nuevoProducto.productoID = productoID;
        nuevoProducto.nombre = nombre;
        nuevoProducto.imagen = imagen;
        nuevoProducto.precio = precio;
        //nuevoProducto.tipoComida = tipoComida;
        nuevoProducto.quienElabora = quienElabora;
        nuevoProducto.descripcion = descripcion;
        nuevoProducto.tiempoPromedioDeElaboracion = tiempoPromedioDeElaboracion
        return nuevoProducto;
    }
}
