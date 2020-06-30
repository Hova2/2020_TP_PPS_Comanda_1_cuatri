import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Mesa } from '../clases/mesa';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { ServicioToastService } from './servicio-toast.service';
import { CommonHelper } from '../clases/common-helper';
import { ColoresToast } from '../enum/colores-toast.enum';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  public coleccionMesas: AngularFirestoreCollection;

  constructor(
    private af: AngularFirestore,
    private toast: ServicioToastService
  ) {
    this.coleccionMesas = this.af.collection<Mesa>('mesas');
  }

  public addMesa(mesa: Mesa): void {
    this.af
      .collection('mesas')
      .add(CommonHelper.ConvertToObject(mesa))
      .then((doc) => {
        this.af.collection('mesas').doc(doc.id).update({ id: doc.id });
        this.toast.mostrarToast(
          'Se dió de alta la mesa con éxito',
          ColoresToast.success
        );
      });
  }

  public traerTodasLasMesas(): Observable<any[]> {
    return this.coleccionMesas.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => {
          const datos = action.payload.doc.data() as Mesa;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }

  public updateMesa(m: Mesa): void {
    this.coleccionMesas
      .doc(m.id)

      .update({
        numero: m.numero,
        cantidadDePersonas: m.cantidadDePersonas,
        estadoMesa: m.estadoMesa,
        tipo: m.tipo,
      })
      .then(() => {
        this.toast.mostrarToast(
          'Se actualizó la mesa con éxito',
          ColoresToast.success
        );
      });
  }

  public listarDisponibles(): Observable<any[]> {
    return this.af
      .collection('mesas')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions
            .map((action) => {
              const datos = action.payload.doc.data() as Mesa;
              const id = action.payload.doc.id;
              console.log(datos.estadoMesa.toString());
              return { id, ...datos };
            })
            .filter((mesa) => {
              return mesa.estadoMesa.toString() === 'Disponible';
            });
        })
      );
  }

  public async traerMesaDelCliente(idCliente: string): Promise<Mesa> {
    const mesaQue = await this.af
      .collection('mesas', (ref) => ref.where('idCliente', '==', idCliente))
      .get()
      .toPromise();

    const salida = mesaQue.docs[0].data() as Mesa;
    salida.id = mesaQue.docs[0].id;

    return salida;
  }

  public actualizarMesaConIdPedido(idMesa: string, idPedido: string) {
    this.af.collection('mesas').doc(idMesa).update({ idPedido: idPedido });
  }
}
