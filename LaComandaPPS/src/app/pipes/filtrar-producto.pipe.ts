import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../clases/producto';

@Pipe({
  name: 'filtrarProducto',
})
export class FiltrarProductoPipe implements PipeTransform {
  transform(arreglo: Array<Producto>, empleado: string): Array<Producto> {
    const arregloTmp = new Array<Producto>();
    arreglo.forEach((producto) => {
      if (empleado === 'mozo') {
        arregloTmp.push(producto);
      } else if (producto.quienElabora === empleado) {
        arregloTmp.push(producto);
      }
    });
    return arregloTmp;
  }
}
