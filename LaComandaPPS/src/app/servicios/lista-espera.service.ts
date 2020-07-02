import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ListaEspera } from '../clases/lista-espera';
import { CommonHelper } from '../clases/common-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class ListaEsperaService {
  constructor(private af: AngularFirestore) {}

  public alta(listaEspera: ListaEspera) {
    this.af
      .collection('listaespera')
      .add(CommonHelper.ConvertToObject(listaEspera));
  }

  public actualizar(id: string, mesa: string) {
    this.af.collection('listaespera').doc(id).update({ mesa: mesa });
  }

  public listarEsperandoEntrar(): Observable<any[]> {
    return this.af
      .collection('listaespera')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions
            .map((action) => {
              const datos = action.payload.doc.data() as ListaEspera;
              const id = action.payload.doc.id;
              return { id, ...datos };
            })
            .filter((el) => {
              return el.esperandoEntrar === true;
            });
        })
      );
  }

  public listarTodas(): Observable<any[]> {
    return this.af
      .collection('listaespera')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const datos = action.payload.doc.data() as ListaEspera;
            const id = action.payload.doc.id;
            return { id, ...datos };
          });
        })
      );
  }

  public existeUsuarioEnLista(idUsuario: string): Observable<any> {
    return this.af
      .collection('listaespera')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          let salida: any = null;
          actions.forEach((action) => {
            const datos = action.payload.doc.data() as ListaEspera;
            const id = action.payload.doc.id;
            if (datos.idUsuario === idUsuario) {
              salida = { id, ...datos };
            }
          });

          return salida;
        })
      );
  }
}
