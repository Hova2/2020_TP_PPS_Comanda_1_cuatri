import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { Rol } from 'src/app/enum/rol.enum';
import { Estados } from 'src/app/enum/estados.enum';
import { QuienElabora } from 'src/app/enum/quien-elabora.enum';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { ProductoService } from 'src/app/servicios/producto.service';
import { CamaraService } from 'src/app/servicios/camara.service';
import { Observable } from 'rxjs';
import { ArchivoService } from 'src/app/servicios/archivo.service';
import { EstadoProducto } from 'src/app/enum/estado-producto.enum';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-gestion-de-productos',
  templateUrl: './gestion-de-productos.page.html',
  styleUrls: ['./gestion-de-productos.page.scss'],
})
export class GestionDeProductosPage implements OnInit {

  public imagen1: string = null;
  public imagen2: string = null;
  public imagen3: string = null;
  public imagen1tmp: string = null;
  public imagen2tmp: string = null;
  public imagen3tmp: string = null;

  public productos: Observable<any[]> = null;
  public hayProductoSeleccionado: Producto = null;

  private todo: FormGroup;

  // private usuarioActivo: Usuario = {
  //   id: 'id',
  //   dni: 0,
  //   nombre: 'raul',
  //   apellido: '',
  //   password: '',
  //   email: '',
  //   rol: Rol.bartender,
  //   imagen: '',
  //   eliminado: false,
  //   estado: Estados.habilitado,
  // };

  private usuarioActivo: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ServicioToastService,
    private ps: ProductoService,
    private cs: CamaraService,
    private as: ArchivoService,
    private authService: AuthService
  ) {
    this.todo = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tiempoDeElaboracion: ['', Validators.required],
      precio: ['', Validators.required],
      select: [null]
    });
  }

  ngOnInit() {

    //this.productos = this.ps.traerProductos();

    // this.authService.traerUsuarioLogueado().then(usuario =>{
    //   this.usuarioActivo = usuario;
    // })   

    this.productos = this.ps.traerProductosActivos();

    setTimeout(() => {

      this.productos.subscribe(productos => {
        productos.forEach(unProd => {
          console.log(unProd.nombre);
        })
      })
    }, 3000);
  }

  logForm() {
    if (this.hayProductoSeleccionado === null) {
      this.altaProducto();
    }
    else {
      console.log("no hay seleccionado");
      this.editarProducto();
    }
  }

  altaProducto() {
    let producto: Producto;
    let elaborador;

    this.traerQuienElabora().then(elabora => {
      elaborador = elabora;
    }).then(() => {

      if (this.imagen1 === null) {
        this.imagen1 = '../../../assets/imagenes/imagenSubirProducto.png';
      }
      if (this.imagen2 === null) {
        this.imagen2 = '../../../assets/imagenes/imagenSubirProducto.png';
      }
      if (this.imagen3 === null) {
        this.imagen3 = '../../../assets/imagenes/imagenSubirProducto.png';
      }

      producto = Producto.crear(
        '',
        this.todo.value.nombre,
        this.imagen1,
        this.imagen2,
        this.imagen3,
        Number.parseFloat(this.todo.value.precio),
        elaborador,
        this.todo.value.descripcion,
        this.todo.value.tiempoDeElaboracion
      );

      console.log(producto.quienElabora);

       this.ps.persistirProducto(producto).then((valor) => {
         if (valor) {
           this.cancelar();
           this.toast.mostrarToast('Alta exitosa', ColoresToast.success);
         } else {
           this.toast.mostrarToast('Error', ColoresToast.danger);
         }
       });

    });
  }

  editarProducto() {

    let cambio: boolean = false;

    if (this.hayProductoSeleccionado.nombre != this.todo.value.nombre) {
      this.ps.updateNombre(this.hayProductoSeleccionado.id, this.todo.value.nombre);
      cambio = true;
    }
    if (this.hayProductoSeleccionado.precio != this.todo.value.precio) {
      this.ps.updatePrecio(this.hayProductoSeleccionado.id, this.todo.value.precio);
      cambio = true;
    }
    if (this.hayProductoSeleccionado.descripcion != this.todo.value.descripcion) {
      this.ps.updateDescripcion(this.hayProductoSeleccionado.id, this.todo.value.descripcion);
      cambio = true;
    }
    if (this.hayProductoSeleccionado.tiempoPromedioDeElaboracion != this.todo.value.tiempoDeElaboracion) {
      this.ps.updateTiempoDeElab(this.hayProductoSeleccionado.id, this.todo.value.tiempoDeElaboracion);
      cambio = true;
    }
    if (this.hayProductoSeleccionado.imagen1 != this.imagen1tmp) {
      this.as.makeFileIntoBlob(this.imagen1).then(blobInfo => {
        this.ps.subirFotoProducto(blobInfo, this.hayProductoSeleccionado.id, "imagen1");
      });
      cambio = true;
    }
    if (this.hayProductoSeleccionado.imagen2 != this.imagen2tmp) {
      this.as.makeFileIntoBlob(this.imagen2).then(blobInfo => {
        this.ps.subirFotoProducto(blobInfo, this.hayProductoSeleccionado.id, "imagen2");
      });
      cambio = true;
    }
    if (this.hayProductoSeleccionado.imagen3 != this.imagen3tmp) {
      this.as.makeFileIntoBlob(this.imagen3).then(blobInfo => {
        this.ps.subirFotoProducto(blobInfo, this.hayProductoSeleccionado.id, "imagen3");
      });
      cambio = true;
    }

    setTimeout(() => {
      if (cambio) {
        this.toast.mostrarToast("Cambios realizados", ColoresToast.success);
      }
      this.cancelar();
    }, 2000);
  }

  async traerQuienElabora() {

    const docUsuario = await this.authService.datosUsuarioLoguado();
    const rol = docUsuario.data().rol;
    if (rol === 'cocinero') {
      return QuienElabora.cocinero;
    } else if (rol === 'bartender') {
      return QuienElabora.bartender;
    }
  }

  sacarFoto(imagen: string) {
    switch (imagen) {
      case 'imagen1':
        this.cs.sacarFoto().then(foto => {
          this.imagen1 = foto;
          this.cs.formatearImageData(foto).then(imgFormat => {
            this.imagen1tmp = imgFormat;
          });
        });
        break;
      case 'imagen2':
        this.cs.sacarFoto().then((foto) => {
          this.imagen2 = foto;
          this.cs.formatearImageData(foto).then(imgFormat => {
            this.imagen2tmp = imgFormat;
          });
        });
        break;
      case 'imagen3':
        this.cs.sacarFoto().then((foto) => {
          this.imagen3 = foto;
          this.cs.formatearImageData(foto).then(imgFormat => {
            this.imagen3tmp = imgFormat;
          });
        });
        break;
    }
  }

  public cancelar(): void {
    this.todo.controls.select.setValue(null);
    this.todo.reset();
    this.imagen1 = null;
    this.imagen1tmp = null;
    this.imagen2 = null;
    this.imagen2tmp = null;
    this.imagen3 = null;
    this.imagen3tmp = null;
    this.hayProductoSeleccionado = null;
  }

  public productoSeleccionado() {
    setTimeout(() => {

      if (this.todo.value.select != null) {

        let parametro = this.todo.value.select;

        this.ps.traerProductoPorId(parametro).then(producto => {
          this.hayProductoSeleccionado = producto;
          this.todo.controls.nombre.setValue(producto.nombre);
          this.todo.controls.descripcion.setValue(producto.descripcion);
          this.todo.controls.precio.setValue(producto.precio);
          this.todo.controls.tiempoDeElaboracion.setValue(producto.tiempoPromedioDeElaboracion);
          this.imagen1tmp = producto.imagen1;
          this.imagen2tmp = producto.imagen2;
          this.imagen3tmp = producto.imagen3;
        });
      }
    }, 500);
  }

  borrarProducto() {
    this.ps.updateState(this.hayProductoSeleccionado.id, EstadoProducto.deshabilitado);
    setTimeout(() => {
      this.cancelar();
    }, 1000);
  }

}
