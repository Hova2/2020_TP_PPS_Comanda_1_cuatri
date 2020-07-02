import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { Estados } from 'src/app/enum/estados.enum';

@Component({
  selector: 'app-autorizacion-usuario',
  templateUrl: './autorizacion-usuario.page.html',
  styleUrls: ['./autorizacion-usuario.page.scss'],
})
export class AutorizacionUsuarioPage implements OnInit {
  public listaDeUsuariosAAutorizar: Observable<Usuario[]>;

  constructor(private us: UsuarioService) {
    this.listaDeUsuariosAAutorizar = this.us.listarEsperandoAutorizacionRegistro();
  }

  ngOnInit() {}

  public autorizar(usuario: Usuario) {
    usuario.estado = Estados.habilitado
    this.us.actualizarUsuario(usuario);
  }

  public rechazar(usuario: Usuario) {
    usuario.estado = Estados.deshabilitado;
    this.us.actualizarUsuario(usuario);
  }
}
