import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { CommonHelper } from '../clases/common-helper';
import { CamaraService } from './camara.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuarios: AngularFirestoreCollection;

  constructor(private db: AngularFirestore, private cs: CamaraService) {
    this.usuarios = this.db.collection<Usuario>('usuarios');
  }

  public Add(user: Usuario): void {
    this.db
      .collection('usuarios')
      .add(CommonHelper.ConvertToObject(user))
      .then((doc) => {
        if (user.imagen === 'ori') {
          this.db.collection('usuarios').doc(doc.id).update({
            imagen:
              'https://firebasestorage.googleapis.com/v0/b/tpfinalpps-3f07f.appspot.com/o/imagenesClientes%2Fusuario.png?alt=media&token=217855c5-40ab-4d0f-9b8b-a3b4293082a3',
          });
        } else {
          this.cs.subirFoto(user.imagen).then((url) => {
            this.db.collection('usuarios').doc(doc.id).update({
              imagen: url,
            });
          });
        }
        this.db.collection('usuarios').doc(doc.id).update({ id: doc.id });
      });
  }

  updateUser(u: Usuario): void {
    let idAnonimo = 'RHaWE2czNq1gKh2p56s7';
    if (u.imagen === 'ori') {
      this.db
        .collection('usuarios')
        .doc(idAnonimo)

        .update({
          imagen:
            'https://firebasestorage.googleapis.com/v0/b/tpfinalpps-3f07f.appspot.com/o/imagenesClientes%2Fusuario.png?alt=media&token=217855c5-40ab-4d0f-9b8b-a3b4293082a3',
          nombre: u.nombre,
        })
        .then(() => {
          console.log('anonimo sin foto');
        });
    } else {
      this.cs.subirFoto(u.imagen).then((url) => {
        this.db.collection('usuarios').doc(idAnonimo).update({
          imagen: url,
          nombre: u.nombre,
        });
      });
    }
  }

  public traerTodosLosMozos(): Promise<Usuario[]> {
    const docs = this.db.collection('usuarios', (ref) =>
      ref.where('rol', '==', 'mozo')
    );
    return docs
      .get()
      .toPromise()
      .then((doc) => {
        const mozos: Usuario[] = [];
        doc.docs.forEach((usuario) => {
          const mozo = usuario.data() as Usuario;
          mozo.id = usuario.id;
          mozos.push(mozo);
        });
        return mozos;
      });
  }

  public buscarUsuario(
    email: string
  ): Promise<firebase.firestore.DocumentData> {
    return this.db
      .collection<Usuario>('usuarios', (ref) => ref.where('email', '==', email))
      .get()
      .toPromise();
  }
}
