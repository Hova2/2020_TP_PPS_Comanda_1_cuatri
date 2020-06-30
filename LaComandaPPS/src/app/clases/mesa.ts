import { TipoMesa } from '../enum/tipo-mesa.enum';
import { EstadoMesa } from '../enum/estado-mesa.enum';


export class Mesa {
         id: string;
         numero: string;
         cantidadDePersonas: number;
         tipo: TipoMesa;
         estadoMesa: EstadoMesa;
         idCliente: string;
         idPedido: string;

         constructor() {
           this.id = '';
           this.numero = '';
           this.cantidadDePersonas = 0;
           this.tipo = null;
           this.estadoMesa = null;
           this.idCliente = '';
           this.idPedido='';
         }

         public static altaMesa(
           id: string,
           numero: string,
           cantidadDePersonas: number,
           tipo: TipoMesa,
           estadoMesa: EstadoMesa
         ) {
           const nuevaMesa = new Mesa();
           nuevaMesa.id = id;
           nuevaMesa.numero = numero;
           nuevaMesa.cantidadDePersonas = cantidadDePersonas;
           nuevaMesa.tipo = tipo;
           nuevaMesa.estadoMesa = estadoMesa;
           nuevaMesa.idCliente = '';
           nuevaMesa.idPedido = '';
           return nuevaMesa;
         }
       }



