import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CommonHelper } from '../clases/common-helper';
import { Mesa } from '../clases/mesa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicioToastService } from './servicio-toast.service';
import { ColoresToast } from '../enum/colores-toast.enum';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  public coleccionMesas: AngularFirestoreCollection;

  constructor(private dbmesas: AngularFirestore,
    private toast: ServicioToastService) { 
    this.coleccionMesas = this.dbmesas.collection<Mesa>('mesas');
  }


  public addMesa(mesa: Mesa): void {
    this.dbmesas
      .collection('mesas')
      .add(CommonHelper.ConvertToObject(mesa))
      .then((doc) => {
        this.dbmesas.collection('mesas').doc(doc.id).update({ id: doc.id });
        this.toast.mostrarToast("Se dió de alta la mesa con éxito",ColoresToast.success);
      });
  }


  public traerTodasLasMesas(): Observable<any[]> {
    return this.coleccionMesas.snapshotChanges().pipe(
        map(actions => {
            return actions.map(action => {
                const datos = action.payload.doc.data() as Mesa;
                const id = action.payload.doc.id;
                return { id, ...datos };
            });
        })
    );
}

public updateMesa(m: Mesa): void {
      
      this.coleccionMesas.doc(m.id)
      
      .update({
        numero: m.numero,
        cantidadDePersonas: m.cantidadDePersonas,
        estadoMesa: m.estadoMesa,
        tipo: m.tipo
      }).then(() => {this.toast.mostrarToast("Se actualizó la mesa con éxito",ColoresToast.success)});
        
    }




}
