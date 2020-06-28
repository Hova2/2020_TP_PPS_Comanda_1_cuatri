import { Producto } from './producto';
import { Usuario } from './usuario';
import { EstadoPedido } from '../enum/estado-pedido.enum';
import { EstadoProducto } from '../enum/estado-producto.enum';

export class Pedido {
    id: string;
    pedidoID: string;
    productos: Producto[];
    total: number;
    mesaID: string;
    cliente: Usuario;
    empleado: Usuario;
    estado: EstadoPedido;
    tiempoParaServir: string;
    horaAlta: number;
    completo: boolean;
    tiempoRetraso: number;
    imagen: string;
    encuestaCompleta: boolean;

    constructor() {
        this.pedidoID = Pedido.generarCodigoID();
        this.productos = [];
        this.total = 0;
        this.mesaID = '';
        this.estado = EstadoPedido.verificar;
        this.tiempoParaServir = undefined;
        this.horaAlta = Date.now();
        this.completo = false;
        this.tiempoRetraso = null;
        this.imagen = 'https://firebasestorage.googleapis.com/v0/b/tpcomanda-880f3.appspot.com/o/MesaGenerica.jpg?alt=media&token=74d4b7c3-d371-41f8-b1ed-ff87e4c8e07c';
        this.encuestaCompleta = false;
    }

    public static crear(mesaID: string): Pedido {
        const pedido = new Pedido();
        pedido.mesaID = mesaID;
        return pedido;
    }

    public static crearDesdeMozo(): Pedido {
        const pedido = new Pedido();
        pedido.estado = EstadoPedido.pendiente;
        return pedido;
    }

    private static generarCodigoID(): string {
        let codigo = '';
        const ahora = new Date();
        codigo += ahora.getFullYear();
        codigo += ahora.getMonth();
        codigo += ahora.getDate();
        codigo += ahora.getHours();
        codigo += ahora.getMinutes();
        codigo += ahora.getSeconds();
        const numero = Math.floor(Math.random() * 5 + 1);
        switch (numero) {
            case 1:
                codigo += 'A';
                break;
            case 2:
                codigo += 'B';
                break;
            case 3:
                codigo += 'C';
                break;
            case 4:
                codigo += '1';
                break;
            default:
                codigo += '2';
                break;
        }
        return codigo;
    }

    public agregarMinutos(minutos: number): void {
        let fecha: Date;

        if (!this.tiempoParaServir) {
            fecha = new Date();
        } else {
            fecha = new Date(this.tiempoParaServir);
        }

        const tiempo = fecha.getTime() + Math.floor(minutos * (1000 * 60));
        const nuevaFecha = new Date(tiempo);
        this.tiempoParaServir = this.convertirFecha(nuevaFecha);
    }

    private convertirFecha(fecha: Date): string {
        const primeraParte =
            fecha.getFullYear() +
            '-' +
            (fecha.getMonth() + 1) +
            '-' +
            fecha.getDate();
        const segundaParte =
            fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
        return primeraParte + ' ' + segundaParte;
    }

    public pedidoCompleto(): void {
        this.completo = true;
        this.estado = EstadoPedido.servido;
        if (this.tiempoParaServir != null) {
            const resta = new Date().getTime() - new Date(this.tiempoParaServir).getTime();
            if (resta > 0) {
                this.tiempoRetraso = resta;
            }
        }
    }

    private estaCompleto(): boolean {
        let completo = true;
        this.productos.forEach(producto => {
            if (producto.estado !== EstadoProducto.terminando) {
                completo = false;
            }
        });
        return completo;
    }

    private seComezoAPreparar(): boolean {
        let seComezoAPreparar = false;
        this.productos.forEach(producto => {
            if (producto.estado === EstadoProducto.preparandose) {
                seComezoAPreparar = true;
            }
        });
        return seComezoAPreparar;
    }

    public actualizarEstadoDePedido(): void {
        if (this.estaCompleto()) {
            this.estado = EstadoPedido.listo;
        } else if (this.seComezoAPreparar()) {
            this.estado = EstadoPedido.cocinando;
        } else {
            this.estado = EstadoPedido.pendiente;
        }
    }
}