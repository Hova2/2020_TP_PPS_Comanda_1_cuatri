import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { Rol } from 'src/app/enum/rol.enum';
import { QuienElabora } from 'src/app/enum/quien-elabora.enum';
import { ServicioToastService } from 'src/app/servicios/servicio-toast.service';
import { ColoresToast } from 'src/app/enum/colores-toast.enum';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-gestion-de-productos',
  templateUrl: './gestion-de-productos.page.html',
  styleUrls: ['./gestion-de-productos.page.scss'],
})
export class GestionDeProductosPage implements OnInit {

  imagen1 = null;
  imagen2 = null;
  imagen3 = null;

  private todo: FormGroup;

  private usuarioActivo: Usuario = {
    id: "id",
    nombre: "raul",
    apellido: '',
    password: '',
    email: '',
    rol: Rol.cocinero,
    imagen: '',
    eliminado: false,
    estado: 'habilitado'
  }      

  constructor(private formBuilder: FormBuilder, private toast: ServicioToastService, private ps: ProductoService) {
    this.todo = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tiempoDeElaboracion: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  logForm() {
    let producto: Producto;
    let arreglo: Array<any>;

    //arreglo = this.traerTipoComida();
    let elaborador = this.traerQuienElabora();
    
    arreglo.push(this.imagen1, this.imagen2, this.imagen3);

    producto = Producto.crear(
      '',
      this.todo.value.nombre,
      arreglo,
      Number.parseFloat(this.todo.value.precio),
      elaborador,
      this.todo.value.descripcion,
      this.todo.value.tiempoDeElaboracion
    );

    this.ps.persistirProducto(producto, arreglo).then(valor => {
      if (valor) {
        this.cancelar();
        this.toast.mostrarToast("Alta exitosa", ColoresToast.success);
      }else{
        this.toast.mostrarToast("Error", ColoresToast.danger);
      }
    });
  }

  traerQuienElabora(){
    if(this.usuarioActivo.rol === "cocinero"){
      return QuienElabora.cocinero;
    }else if(this.usuarioActivo.rol === "bartender"){
      return QuienElabora.bartender;
    }
  }


  sacarFoto(imagen: string) {
    console.log(imagen);
  }

  public cancelar(): void {
    this.todo.reset();
  }

}
