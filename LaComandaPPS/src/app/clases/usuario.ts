import { Perfiles } from '../enum/perfiles.enum';
import { Sexos } from '../enum/sexos.enum';
import { Rol } from '../enum/rol.enum';

export class Usuario {

    id: string;
    nombre: string;
    apellido: string;
    password: string;
    email: string;
    rol: Rol;
    imagen: string;
    eliminado: boolean;
    estado: string;

    constructor() {
        this.nombre = '';
        this.apellido = '';
        this.password = '';
        this.email = '';
        this.rol = Rol.socio;
        this.imagen = '';
        this.eliminado = false;
        this.estado = 'habilitado';
    }
}
