import { Injectable } from '@angular/core';
import { Producto } from '../clases/producto';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TipoComida } from '../enum/tipo-comida.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    //private as: ArchivoService
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
        tmp.productoID = producto.productoID;
        tmp.descripcion = producto.description;
        tmp.tipoComida = producto.tipoComida;
        tmp.nombre = producto.nombre;
        tmp.imagen = producto.imagen;
        tmp.precio = parseInt(producto.precio);
        tmp.estado = producto.estado;
        tmp.quienElabora = producto.quienElabora;

        this.listado.push(tmp);
      });
    });
  }

  persistirProducto(producto: Producto, arregloImagenes: Array<any>): Promise<boolean> {
    return this.productos
      .add(JSON.parse(JSON.stringify(producto)))
      .then(doc => {
        this.productos.doc(doc.id).update({ productoID: doc.id });
        if (Array) {
          //this.as.subirFotoProducto(foto, doc.id);
        }
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  updateState(uid: string, estado: string) {
    this.productos.doc(uid).update({
      estado: estado
    });
  }

  updateProd(producto: Producto, foto: File): Promise<boolean> {
    return this.productos
      .doc(producto.productoID)
      .update({
        nombre: producto.nombre,
        precio: producto.precio,
        tipoComida: producto.tipoComida,
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
      ref.where('productoID', '==', id)
    );
    return docRef
      .get()
      .toPromise()
      .then(doc => {
        const producto = doc.docs[0].data() as Producto;
        producto.productoID = doc.docs[0].id;
        return producto;
      });
  }

  public esUnTipoDeComida(producto: Producto, tipo: string): boolean {
    return producto.tipoComida.includes(tipo as TipoComida);
  }
}
