import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions/functions';
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
}
