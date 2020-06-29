import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afsAuth: AngularFireAuth,
    private userService: UsuarioService,
    private router: Router
  ) {}

  public logueoConEmail(email: string, pwd: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afsAuth
        .signInWithEmailAndPassword(email, pwd)
        .then((userData) => {
          resolve(userData);
          console.log('Login success', userData);
        })
        .catch((error) => reject(error));
    });
  }

  public logueoConAnonimo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afsAuth
        .signInAnonymously()
        .then((userData) => {
          resolve(userData);
          console.log('Login success', userData);
        })
        .catch((error) => reject(error));
    });
  }

  public logout(): void {
    this.afsAuth.signOut();
    this.router.navigate(['/']);
  }

  public RegisterWithEmail(user: Usuario) {
    return new Promise((resolve, reject) => {
      this.afsAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userData) => {
          resolve(userData);
          this.userService.Add(user);
          console.log('Register successful');
        })
        .catch((error) => console.log(reject(error)));
    });
  }

  public logueoConEmailAnonimo(usr: Usuario) {
    let email = usr.email;
    let pwd = usr.password;
    return new Promise((resolve, reject) => {
      this.afsAuth
        .signInWithEmailAndPassword(email, pwd)
        .then((userData) => {
          resolve(userData);
          console.log('Login success', userData);
          this.router.navigate(['/principal']);
        })
        .catch((error) => reject(error));
    });
  }

  public async datosUsuarioLoguado(): Promise<firebase.firestore.DocumentData> {
    const usuarioLogueado = await this.afsAuth.currentUser;
    const docUsuario = await this.userService.buscarUsuario(
      usuarioLogueado.email
    );
    return docUsuario.docs[0];
  }

  
}
