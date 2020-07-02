import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { EncuestaCliente } from '../clases/encuesta-cliente';
import { ArchivoService } from './archivo.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  

  
  public encuestas = this.af.collection<EncuestaCliente>('encuestas');

  constructor(private af: AngularFirestore,
    private as: ArchivoService,
    private angularFireStorage: AngularFireStorage) {}

  public addEncuestaCliente(encuestaC: EncuestaCliente): Promise<boolean> {
      
      return this.encuestas
      .add(JSON.parse(JSON.stringify(encuestaC))).
        then((doc) => {
          this.encuestas.doc(doc.id).update({ id: doc.id });

          if (encuestaC.imagen1 !== '../../../assets/imagenes/imagenSubirProducto.png') {
            this.as.makeFileIntoBlob(encuestaC.imagen1).then(blobInfo => {
  
              this.subirFotoEncuesta(blobInfo, doc.id, "imagen1");
            });
          }
          if (encuestaC.imagen2 !== '../../../assets/imagenes/imagenSubirProducto.png') {
            this.as.makeFileIntoBlob(encuestaC.imagen2).then(blobInfo => {
  
              this.subirFotoEncuesta(blobInfo, doc.id, "imagen2");
            });
          }
          if (encuestaC.imagen3 !== '../../../assets/imagenes/imagenSubirProducto.png') {
            this.as.makeFileIntoBlob(encuestaC.imagen3).then(blobInfo => {
  
              this.subirFotoEncuesta(blobInfo, doc.id, "imagen3");
            });
          }
  
        })
        .then(() => {
          setTimeout(() => {
            
          }, 30000);
          return true;
        })
        .catch(() => {
          return false;
        });
    }



    public subirFotoEncuesta(_imageBlobInfo, id: string, imagen: string): Promise<string> {
      const pathFoto = `imagenesEncuestas/${_imageBlobInfo.fileName}`;
      const tarea = this.angularFireStorage.upload(pathFoto, _imageBlobInfo.imgBlob);
  
      return tarea.then(() => {
        this.angularFireStorage
          .ref(pathFoto)
          .getDownloadURL()
          .subscribe(url => {
            this.updateImageURL(id, imagen, url);
          });
      });
    }

    updateImageURL(uid: string, imagen: string, url) {
      switch (imagen) {
        case 'imagen1':
          this.encuestas.doc(uid).update({
            imagen1: url
          });
          break;
        case 'imagen2':
          this.encuestas.doc(uid).update({
            imagen2: url
          });
          break;
        case 'imagen3':
          this.encuestas.doc(uid).update({
            imagen3: url
          });
          break;
      }
    }


    public traerTodasLasEncuestas(): Observable<any[]> {
      return this.encuestas.snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            const datos = action.payload.doc.data() as EncuestaCliente;
            const id = action.payload.doc.id;
            return { id, ...datos };
          });
        })
      );
    }

}
