import { Injectable } from '@angular/core';
import { Producto } from '../clases/producto';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TipoComida } from '../enum/tipo-comida.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArchivoService } from './archivo.service';
import { promise } from 'protractor';

import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public productos: AngularFirestoreCollection;
  public listado = new Array<Producto>();
  public url: string;
  public primerosTres = new Array<any>();
  public ultimosTres = new Array<any>();

  constructor(
    private af: AngularFirestore,
    private aff: AngularFireFunctions,
    private as: ArchivoService,
    private file: File,
    private angularFireStorage: AngularFireStorage,
  ) {
    this.productos = this.af.collection<Producto>('productos');
    this.traerProductosArray();
  }


  public crearListaProductos(): Producto[] {
    return this.listado;
  }

  public traerTodos(): any {
    return this.af.collection('productos');
  }

  public traerTodos2() {
    return this.af.collection('productos');
  }

  public traerProductos(): Observable<any[]> {
    return this.productos.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as Producto;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }

  traerProductosArray() {
    let listadoObservable = null;

    listadoObservable = this.traerProductos();
    listadoObservable.subscribe(productos => {
      productos.forEach(producto => {
        const tmp = new Producto();
        tmp.id = producto.id;
        tmp.descripcion = producto.description;
        tmp.nombre = producto.nombre;
        tmp.imagen1 = producto.imagen1;
        tmp.imagen2 = producto.imagen2;
        tmp.imagen3 = producto.imagen3;
        tmp.precio = parseInt(producto.precio);
        tmp.estado = producto.estado;
        tmp.quienElabora = producto.quienElabora;

        this.listado.push(tmp);
      });
    });
  }

  persistirProducto(producto: Producto): Promise<boolean> {

    let id: string = null;
    let array: Array<string> = new Array();

    return this.productos
      .add(JSON.parse(JSON.stringify(producto)))
      .then(doc => {
        id = doc.id;
        this.productos.doc(doc.id).update({ id: doc.id });

        if (producto.imagen1 !== '../../../assets/imagenes/imagenSubirProducto.png') {
          this.as.makeFileIntoBlob(producto.imagen1).then(blobInfo => {

            this.subirFotoProducto(blobInfo, doc.id, "imagen1");
          });
        }
        if (producto.imagen2 !== '../../../assets/imagenes/imagenSubirProducto.png') {
          this.as.makeFileIntoBlob(producto.imagen2).then(blobInfo => {

            this.subirFotoProducto(blobInfo, doc.id, "imagen2");
          });
        }
        if (producto.imagen3 !== '../../../assets/imagenes/imagenSubirProducto.png') {
          this.as.makeFileIntoBlob(producto.imagen3).then(blobInfo => {

            this.subirFotoProducto(blobInfo, doc.id, "imagen3");
          });
        }

      })
      .then(() => {
        setTimeout(() => {
          console.log(array);
          this.productos.doc(id).update({ imagenes: array });
        }, 30000);
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  public subirFotoProducto(_imageBlobInfo, id: string, imagen: string): Promise<string> {
    const pathFoto = `imagenesProductos/${_imageBlobInfo.fileName}`;
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

  updateState(uid: string, estado: string) {
    this.productos.doc(uid).update({
      estado: estado
    });
  }

  updateNombre(uid: string, nombre: string) {
    this.productos.doc(uid).update({
      nombre: nombre
    });
  }

  updatePrecio(uid: string, precio: number) {
    this.productos.doc(uid).update({
      precio: precio
    });
  }

  updateDescripcion(uid: string, descripcion: string) {
    this.productos.doc(uid).update({
      descripcion: descripcion
    });
  }

  updateTiempoDeElab(uid: string, tiempo: number) {
    this.productos.doc(uid).update({
      tiempoPromedioDeElaboracion: tiempo
    });
  }

  updateImageURL(uid: string, imagen: string, url) {
    switch (imagen) {
      case 'imagen1':
        this.productos.doc(uid).update({
          imagen1: url
        });
        break;
      case 'imagen2':
        this.productos.doc(uid).update({
          imagen2: url
        });
        break;
      case 'imagen3':
        this.productos.doc(uid).update({
          imagen3: url
        });
        break;
    }
  }

  updateProd(producto: Producto, foto: File): Promise<boolean> {
    return this.productos
      .doc(producto.id)
      .update({
        nombre: producto.nombre,
        precio: producto.precio,
        description: producto.descripcion,
        quienElabora: producto.quienElabora
      })
      .then(() => {
        if (foto) {
          //this.as.subirFotoProducto(foto, producto.productoID);
        }
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  public traerProductoPorId(id: string): Promise<Producto> {
    const docRef = this.af.collection('productos', ref =>
      ref.where('id', '==', id)
    );
    return docRef
      .get()
      .toPromise()
      .then(doc => {
        const producto = doc.docs[0].data() as Producto;
        producto.id = doc.docs[0].id;
        return producto;
      });
  }

  // public esUnTipoDeComida(producto: Producto, tipo: string): boolean {
  //   return producto.tipoComida.includes(tipo as TipoComida);
  // }

  formatearImageData(imagedata) {
    let filename = imagedata.substring(imagedata.lastIndexOf('/') + 1);
    let path = imagedata.substring(0, imagedata.lastIndexOf('/') + 1);

    return this.file.readAsDataURL(path, filename).then((base64data) => {
      // console.log("this.file");
      // console.log(this.file);
      // this.photos.push(base64data);
      // this.captureDataUrl = base64data;

      return base64data;
    });
  }

  public traerProductosActivos(): Observable<any[]> {
    return this.af.collection('productos', (ref)=>
    ref.where('estado', '==', 'pendiente')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as Producto;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }
}
