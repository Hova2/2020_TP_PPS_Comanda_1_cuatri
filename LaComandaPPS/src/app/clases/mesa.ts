import { TipoMesa } from '../enum/tipo-mesa.enum';
import { EstadoMesa } from '../enum/estado-mesa.enum';


export class Mesa {
    id: string;
    numero: string
    cantidadDePersonas: number;
    tipo: TipoMesa;
    estadoMesa: EstadoMesa;
    imagen: string;

    constructor() {
        this.id = '';
        this.numero = '';        
        this.cantidadDePersonas = 0;
        this.tipo = null;
        this.estadoMesa = null;
        this.imagen = '';
    }

    public static crear(
        id: string,
        numero: string,
        cantidadDePersonas: number,
        tipo: TipoMesa,
        estadoMesa: EstadoMesa,
        imagen: string
    ) {
        const nuevaMesa = new Mesa();
        nuevaMesa.id = id;
        nuevaMesa.numero = numero;
        nuevaMesa.cantidadDePersonas = cantidadDePersonas;
        nuevaMesa.tipo = tipo;
        nuevaMesa.estadoMesa = estadoMesa;
        nuevaMesa.imagen = imagen
        return nuevaMesa;
    }
    
}



