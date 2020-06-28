import { Injectable } from '@angular/core';
import { CamaraService } from './camara.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { File } from '@ionic-native/file/ngx';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Producto } from '../clases/producto';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(
    private camaraService: CamaraService,
    private angularFireStorage: AngularFireStorage,
    private file: File,
  ) {
  }

  public subirFotoProducto(_imageBlobInfo, id: string, imagen: string): Promise<string> {
    const pathFoto = `app1-imagenes/${_imageBlobInfo.fileName}`;
    const tarea = this.angularFireStorage.upload(pathFoto, _imageBlobInfo.imgBlob);

    return tarea.then(() => {
      return this.angularFireStorage
        .ref(pathFoto)
        .getDownloadURL()
        .subscribe(url => {
          return url;
          //this.productoService.updateImageURL(id, imagen, url);
        });
    });
  }

  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

}
