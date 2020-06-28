import { Injectable } from '@angular/core';
import { Mensaje } from '../clases/mensaje';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  public mensajes: AngularFirestoreCollection;
  public listadoMensajes = new Array<Mensaje>();


  constructor(private af: AngularFirestore) {
    this.mensajes = this.af.collection<Mensaje>('mensajes');
  }

  persistirMensaje(mensaje): Promise<boolean> {

    let id: string = null;

    return this.mensajes.add(JSON.parse(JSON.stringify(mensaje)))
      .then(doc => {
        id = doc.id;
        this.mensajes.doc(doc.id).update({ id: doc.id });
      }).then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });

  }

  responderMensaje(uid: string, laRespuesta: string): Promise<boolean> {
    return this.mensajes.doc(uid).update({
      respuesta: laRespuesta
    }).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }

  public traerMensajes(): Observable<any[]> {
    return this.mensajes.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as Mensaje;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }

  public traerNoRespondidos(): Observable<any[]> {
    return this.af.collection('mensajes', (ref) =>
      ref.where('respuesta', '==', null)).snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            const datos = action.payload.doc.data() as Mensaje;
            const id = action.payload.doc.id;
            return { id, ...datos };
          });
        })
      );
  }

  public traerMisMensajes(nombre: string): Observable<any[]> {
    return this.af.collection('mensajes', (ref) =>
      ref.where('nombreUsuario', '==', nombre)).snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            const datos = action.payload.doc.data() as Mensaje;
            const id = action.payload.doc.id;
            return { id, ...datos };
          });
        })
      );
  }

  public traerMisMensajesParaResponder(nombre: string): Observable<any[]> {
    return this.af.collection('mensajes', (ref) =>
      ref.where('nombreMozo', '==', nombre).where('respuesta', '==', null)).snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            const datos = action.payload.doc.data() as Mensaje;
            const id = action.payload.doc.id;
            return { id, ...datos };
          });
        })
      );
  }

  public traerMensajePorId(id: string): Promise<Mensaje> {
    const docRef = this.af.collection('mensajes', ref =>
      ref.where('id', '==', id)
    );
    return docRef
      .get()
      .toPromise()
      .then(doc => {
        const mensaje = doc.docs[0].data() as Mensaje;
        mensaje.id = doc.docs[0].id;
        return mensaje;
      });
  }


}
