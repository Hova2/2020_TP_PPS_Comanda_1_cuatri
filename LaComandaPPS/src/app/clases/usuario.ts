import { Perfiles } from '../enum/perfiles.enum';
import { Sexos } from '../enum/sexos.enum';

export class Usuario {
    public id: string;
    public correo: string;
    public clave: string;
    public perfil: Perfiles;
    public sexo: Sexos;

    constructor() 
    {
        this.id = "";
        this.correo = "";
        this.clave = "";
        this.perfil = null;
        this.sexo = null;
    }
}
