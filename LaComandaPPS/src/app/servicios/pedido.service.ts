import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Pedido } from '../clases/pedido';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuienElabora } from '../enum/quien-elabora.enum';
import { EstadoPedido } from '../enum/estado-pedido.enum';
import { Producto } from '../clases/producto';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private af: AngularFirestore) { }

  public calcularTotal(pedido: Pedido): number {
    let total: number;
    total = 0;
    pedido.productos.forEach((producto) => {
      total += producto.precio;
    });

    return total;
  }

  public verificarPedido(pedido: Pedido): boolean {
    let esValido = false;

    if (
      pedido.pedidoID !== '' &&
      pedido.pedidoID !== undefined &&
      pedido.productos.length > 0 &&
      pedido.total > 0 &&
      pedido.mesaID !== '' &&
      pedido.mesaID !== undefined &&
      pedido.estado !== undefined &&
      pedido.horaAlta !== undefined &&
      pedido.horaAlta !== 0
    ) {
      esValido = true;
    }

    return esValido;
  }

  public async agregarPedido(pedido: Pedido): Promise<string> {
    const docRef = await this.af
      .collection('pedidos')
      .add(JSON.parse(JSON.stringify(pedido)));
    return docRef.id;
  }

  public actualizarEstado(estado: EstadoPedido, pedidoID: string): void {
    this.traerPorID(pedidoID).then((pedido) => {
      pedido.estado = estado;
      this.af.collection('pedidos').doc(pedido.id).update(pedido);
    });
  }

  public actualizarEncuesta(pedidoID: string): void {
    this.traerPorID(pedidoID).then((pedido) => {
      pedido.encuestaCompleta = true;
      this.af.collection('pedidos').doc(pedido.id).update(pedido);
    });
  }

  public agregarPropina(producto: Producto, pedidoID: string): void {
    this.traerPorID(pedidoID).then((pedido) => {

      const nombreUltimo = pedido.productos[pedido.productos.length - 1].nombre;
      console.log(nombreUltimo);

      if (nombreUltimo === "propina") {
        pedido.productos.pop();
        pedido.productos.push(producto);
        pedido.total = this.calcularTotal(pedido);
        this.actualizar(pedido);
        // this.af.collection('pedidos').doc(pedido.id).update({
        //   productos: pedido.productos,
        //   total: pedido.total
        // });
      } else {
        pedido.productos.push(producto);
        pedido.total = this.calcularTotal(pedido);
        console.log(pedido.productos);
        console.log(pedido.total);
        this.actualizar(pedido);
        // this.af.collection('pedidos').doc(pedido.id).update({
        //   productos: pedido.productos,
        //   total: pedido.total
        // });
      }

    });
  }


  public traerPorID(pedidoID: string): Promise<Pedido> {
    const docs = this.af.collection('pedidos', (ref) =>
      ref.where('pedidoID', '==', pedidoID)
    );
    return docs
      .get()
      .toPromise()
      .then((doc) => {
        return new Promise((resolve, reject) => {
          if (doc.docs[0]) {
            const pedido = doc.docs[0].data() as Pedido;
            pedido.id = doc.docs[0].id;
            resolve(pedido);
          } else {
            reject('No se encontró el pedido.');
          }
        });
      });
  }

  public traerPedidoPorIdDocumento(id: string): Promise<Pedido> {
    const docs = this.af.collection('pedidos', (ref) =>
      ref.where('id', '==', id)
    );
    return docs
      .get()
      .toPromise()
      .then((doc) => {
        return new Promise((resolve, reject) => {
          if (doc.docs[0]) {
            const pedido = doc.docs[0].data() as Pedido;
            pedido.id = doc.docs[0].id;
            resolve(pedido);
          } else {
            reject('No se encontró el pedido.');
          }
        });
      });
  }

  public traerTodosLosPedidosPorTiempo(): AngularFirestoreCollection<Pedido> {
    return this.af.collection('pedidos', (ref) =>
      ref.where('completo', '==', false)
    );
  }

  public traerTodosLosPedidosCompletadosEnUnArreglo(): Promise<Pedido[]> {
    return this.af
      .collection('pedidos', (ref) => ref.where('completo', '==', true))
      .get()
      .toPromise()
      .then((doc) => {
        const pedidos: Pedido[] = [];
        doc.docs.forEach((pedido) => {
          pedidos.push(pedido.data() as Pedido);
        });

        return pedidos;
      });
  }

  public traerTodosLosPedidosDeLosMozosPorTiempo(email: string) {
    return this.af.collection('pedidos', (ref) =>
      ref.where('empleado.email', '==', email).where('completo', '==', false)
    );
  }

  public traerTodosPorQuienElabora(
    quienElabora: QuienElabora
  ): Observable<Pedido[]> {
    const docs = this.af.collection('pedidos', (ref) =>
      ref.where('completo', '==', false).orderBy('horaAlta', 'desc')
    ) as AngularFirestoreCollection<Pedido>;
    return docs.valueChanges().pipe(
      map((pedidos) => {
        return pedidos.filter((pedido) => {
          pedido = Object.assign(new Pedido(), pedido);
          let tieneRol = false;
          pedido['productos'].forEach((producto) => {
            if (producto.quienElabora === quienElabora) {
              tieneRol = true;
            }
          });
          if (tieneRol) {
            return pedido;
          }
        });
      })
    );
  }

  public actualizar(pedido: Pedido): Promise<boolean> {
    return this.traerPorID(pedido.pedidoID)
      .then((pedi) => {
        this.af
          .collection('pedidos')
          .doc(pedi.id)
          .update(JSON.parse(JSON.stringify(pedido)));
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  public GetAll() {
    return this.af.collection('pedidos');
  }

  public traerProductosPedidos(): Observable<Map<string, number>> {
    return this.af
      .collection<Pedido>('pedidos', (ref) =>
        ref.where('estado', '==', 'pagado')
      )
      .valueChanges()
      .pipe(
        map((pedidos) => {
          /*const salida = new Map<string, number>();
          pedidos.forEach(pedido => {
            pedido.productos.forEach(producto => {
              if (salida.has(producto.nombre)) {
                salida.set(producto.nombre, salida.get(producto.nombre) + 1);
              } else {
                salida.set(producto.nombre, 1);
              }
            });
          });
          return salida;*/

          const salida = new Map<string, number>();
          const tmp = new Map<string, number>();
          pedidos.forEach((pedido) => {
            pedido.productos.forEach((producto) => {
              if (tmp.has(producto.nombre)) {
                tmp.set(producto.nombre, tmp.get(producto.nombre) + 1);
              } else {
                tmp.set(producto.nombre, 1);
              }
            });
          });
          for (const [clave, valor] of [...tmp.entries()].sort(
            (valor1, valor2) => valor2[1] - valor1[1]
          )) {
            salida.set(clave, valor);
          }

          return salida;
        })
      );
  }

  public traerTop3ProductosMasVendidos(): Observable<Map<string, number>> {
    return this.traerProductosPedidos().pipe(
      map((productos) => {
        const salida = new Map<string, number>();
        salida.set([...productos.keys()][0], [...productos.values()][0]);
        salida.set([...productos.keys()][1], [...productos.values()][1]);
        salida.set([...productos.keys()][2], [...productos.values()][2]);
        return salida;
      })
    );
  }

  public traerTop3ProductosMenosVendidos(): Observable<Map<string, number>> {
    return this.traerProductosPedidos().pipe(
      map((productos) => {
        const salida = new Map<string, number>();
        salida.set(
          [...productos.keys()][productos.size - 1],
          [...productos.values()][productos.size - 1]
        );
        salida.set(
          [...productos.keys()][productos.size - 2],
          [...productos.values()][productos.size - 2]
        );
        salida.set(
          [...productos.keys()][productos.size - 3],
          [...productos.values()][productos.size - 3]
        );
        return salida;
      })
    );
  }

  public traerMesasPedidosCont(): Observable<Map<string, number>> {
    return this.af
      .collection<Pedido>('pedidos', (ref) =>
        ref.where('estado', '==', 'pagado')
      )
      .valueChanges()
      .pipe(
        map((pedidos) => {
          const salida = new Map<string, number>();
          const tmp = new Map<string, number>();
          pedidos.forEach((pedido) => {
            if (tmp.has(pedido.mesaID)) {
              tmp.set(pedido.mesaID, tmp.get(pedido.mesaID) + 1);
            } else {
              tmp.set(pedido.mesaID, 1);
            }
          });
          for (const [clave, valor] of [...tmp.entries()].sort(
            (valor1, valor2) => valor2[1] - valor1[1]
          )) {
            salida.set(clave, valor);
          }

          return salida;
        })
      );
  }

  public traerMesaMasUsada(): Observable<Map<string, number>> {
    return this.traerMesasPedidosCont().pipe(
      map((mesas) => {
        return new Map<string, number>().set(
          [...mesas.keys()][0],
          [...mesas.values()][0]
        );
      })
    );
  }

  public traerMesaMenosUsada(): Observable<Map<string, number>> {
    return this.traerMesasPedidosCont().pipe(
      map((mesas) => {
        return new Map<string, number>().set(
          [...mesas.keys()][mesas.size - 1],
          [...mesas.values()][mesas.size - 1]
        );
      })
    );
  }

  public traerMesasPedidosAcum(): Observable<Map<string, number>> {
    return this.af
      .collection<Pedido>('pedidos', (ref) =>
        ref.where('estado', '==', 'pagado')
      )
      .valueChanges()
      .pipe(
        map((pedidos) => {
          const salida = new Map<string, number>();
          const tmp = new Map<string, number>();
          pedidos.forEach((pedido) => {
            if (tmp.has(pedido.mesaID)) {
              tmp.set(pedido.mesaID, tmp.get(pedido.mesaID) + pedido.total);
            } else {
              tmp.set(pedido.mesaID, pedido.total);
            }
          });
          for (const [clave, valor] of [...tmp.entries()].sort(
            (valor1, valor2) => valor2[1] - valor1[1]
          )) {
            salida.set(clave, valor);
          }

          return salida;
        })
      );
  }

  public traerMesaMasRecaudo(): Observable<Map<string, number>> {
    return this.traerMesasPedidosAcum().pipe(
      map((mesas) => {
        return new Map<string, number>().set(
          [...mesas.keys()][0],
          [...mesas.values()][0]
        );
      })
    );
  }

  public traerMesaMenosRecaudo(): Observable<Map<string, number>> {
    return this.traerMesasPedidosAcum().pipe(
      map((mesas) => {
        return new Map<string, number>().set(
          [...mesas.keys()][mesas.size - 1],
          [...mesas.values()][mesas.size - 1]
        );
      })
    );
  }

  public traerMesasPedidosTotal(): Observable<Map<number, string>> {
    return this.af
      .collection<Pedido>('pedidos', (ref) =>
        ref.where('estado', '==', 'pagado')
      )
      .valueChanges()
      .pipe(
        map((pedidos) => {
          const salida = new Map<number, string>();
          const tmp = new Map<number, string>();
          pedidos.forEach((pedido) => {
            tmp.set(pedido.total, pedido.mesaID);
          });
          for (const [clave, valor] of [...tmp.entries()].sort(
            (valor1, valor2) => valor2[0] - valor1[0]
          )) {
            salida.set(clave, valor);
          }

          return salida;
        })
      );
  }

  public traerMesaMayorFactura(): Observable<Map<number, string>> {
    return this.traerMesasPedidosTotal().pipe(
      map((mesas) => {
        return new Map<number, string>().set(
          [...mesas.keys()][0],
          [...mesas.values()][0]
        );
      })
    );
  }

  public traerMesaMenorFactura(): Observable<Map<number, string>> {
    return this.traerMesasPedidosTotal().pipe(
      map((mesas) => {
        return new Map<number, string>().set(
          [...mesas.keys()][mesas.size - 1],
          [...mesas.values()][mesas.size - 1]
        );
      })
    );
  }

  public GetAllDelayedOrders_InArray(): Promise<Pedido[]> {
    return this.af
      .collection('pedidos')
      .get()
      .toPromise()
      .then((doc) => {
        const orders: Pedido[] = [];
        doc.docs.forEach((el) => {
          const ela = el.data() as Pedido;
          if (ela['tiempoRetraso'] != null) {
            orders.push(ela);
          }
        });
        return orders;
      });
  }

  public GetAllCancelledOrders_InArray(): Promise<Pedido[]> {
    return this.af
      .collection('pedidos')
      .get()
      .toPromise()
      .then((doc) => {
        const orders: Pedido[] = [];
        doc.docs.forEach((el) => {
          const ela = el.data() as Pedido;
          if (ela['estado'] === 'cancelado') {
            orders.push(ela);
          }
        });
        return orders;
      });
  }

  // public setPedidoImagen(id: string, imagen: File) {
  //   this.traerPorID(id)
  //     .then(pedido => {
  //       this.subirImagen(pedido, imagen);
  //     })
  //     .catch(() => {});
  // }

  // public subirImagen(pedido: Pedido, imagen: File) {
  //   return this.as.subirFotoPedido(imagen, pedido.id).then(() => {
  //     return true;
  //   });
  // }

  public actualizarPedidoConIdPedido(idPedido: string) {
    this.af.collection('pedidos').doc(idPedido).update({ id: idPedido });
  }

  public listarPedidosMozo(idMozo: string): Observable<Pedido[]> {
    return this.af
      .collection<Pedido>('pedidos')
      .snapshotChanges()
      .pipe(
        map((docPedidos) => {
          return docPedidos
            .filter((doc) => {
              const docDatos = doc.payload.doc.data();
              return (
                docDatos.empleado.id === idMozo &&
                docDatos.estado !== 'cancelado'
              );
            })
            .map((doc) => {
              return doc.payload.doc.data() as Pedido;
            });
        })
      );
  }

  public listarPedidosQuienPrepara(rol: string): Observable<Pedido[]> {
    return this.af
      .collection<Pedido>('pedidos')
      .snapshotChanges()
      .pipe(
        map((docPedidos) => {
          return docPedidos
            .filter((doc) => {
              const estado = doc.payload.doc.data().estado;
              const productos = doc.payload.doc
                .data()
                .productos.filter((prod) => {
                  return prod.quienElabora === rol;
                });
              return (
                productos.length > 0 &&
                estado !== 'verificar' &&
                estado !== 'cancelado' &&
                estado !== 'listo'
              );
            })
            .map((doc) => {
              return doc.payload.doc.data() as Pedido;
            });
        })
      );
  }

  public traerPedidoObservable(id: string): Observable<Pedido> {
    return this.af.collection<Pedido>('pedidos', (ref) => ref.where('id', '==', id)).snapshotChanges()
      .pipe(
        map((docPedidos) => {
          const arraytmp = docPedidos.map((doc) => {
            return doc.payload.doc.data() as Pedido;
          });

          return arraytmp[0];
        })
      )
  };

  public traerPorIdDocumento(id: string): Promise<Pedido> {
    const docs = this.af.collection('pedidos', (ref) =>
      ref.where('id', '==', id)
    );
    return docs
      .get()
      .toPromise()
      .then((doc) => {
        return new Promise((resolve, reject) => {
          if (doc.docs[0]) {
            const pedido = doc.docs[0].data() as Pedido;
            pedido.id = doc.docs[0].id;
            resolve(pedido);
          } else {
            reject('No se encontró el pedido.');
          }
        });
      });
  }

}