import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { File } from '@ionic-native/file/ngx';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  constructor(
    private camera: Camera,
    private file: File,
    private angularFireStorage: AngularFireStorage
  ) {}

  sacarFoto(): Promise<any> {
    var options: CameraOptions = {
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
    };
    return this.camera.getPicture(options);
  }

  public subirFoto(urlNativa: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.convertirArchivoFotoABlob(urlNativa)
        .then((archivo) => {
          this.angularFireStorage
            .upload('imagenesClientes/' + urlNativa.split('/').pop(), archivo)
            .then((info) => {
              info.ref.getDownloadURL().then((url) => {
                resolve(url);
              });
            });
        })
        .catch((e) => reject(e));
    });
  }

  private convertirArchivoFotoABlob(rutaImagen: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let nombreDelArchivo = '';
      this.file
        .resolveLocalFilesystemUrl(rutaImagen)
        .then((entradaDeArchivo) => {
          let { name, nativeURL } = entradaDeArchivo;
          let ruta = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          nombreDelArchivo = name;
          return this.file.readAsArrayBuffer(ruta, nombreDelArchivo);
        })
        .then((buffer) => {
          let imgBlob = new Blob([buffer], {
            type: 'image/jpeg',
          });

          resolve(imgBlob);
        })
        .catch((e) => reject(e));
    });
  }
}
