import { Rol } from '../enum/rol.enum';
import { Estados } from '../enum/estados.enum';

export class Usuario {

    id: string;
    nombre: string;
    apellido: string;
    password: string;
    dni: number;
    email: string;
    rol: Rol;
    imagen: string;
    eliminado: boolean;
    estado: Estados;

    public static RegistroCliente(nombre: string, apellido: string,  email: string, password: string, dni:number, foto: string): Usuario
    {
        let user = new Usuario();
        user.nombre = nombre;
        user.apellido = apellido;
        user.password = password;
        user.email = email;
        user.dni = dni;
        user.rol = Rol.cliente;
        user.eliminado = false;
        user.estado = Estados.paraAprobar;
        user.imagen = foto;//'assets/usuario.png'
        return user;
    }

    constructor() {
        this.nombre = '';
        this.apellido = '';
        this.password = '';
        this.email = '';
        this.rol = Rol.socio;
        this.imagen = '';
        this.eliminado = false;
        this.estado = Estados.habilitado;
    }
}
