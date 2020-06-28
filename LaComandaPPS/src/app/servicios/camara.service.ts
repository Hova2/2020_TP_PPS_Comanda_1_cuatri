import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { File } from '@ionic-native/file/ngx';
import { Usuario } from '../clases/usuario';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  constructor(
    private camera: Camera,
    private file: File,
    private angularFireStorage: AngularFireStorage
  ) { }

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
                console.log("url en cs"+url);
                resolve(url);
              });
            });
        })
        .catch((e) => reject(e));
    });
  }

  public convertirArchivoFotoABlob(rutaImagen: string): Promise<any> {

    return new Promise((resolve, reject) => {
      let nombreDelArchivo = '';

      //esto hay que borrarlo despues
      console.log("rutaImagen" + rutaImagen);
      console.log("resolveLocalFilesystemUrl"+this.file
        .resolveLocalFilesystemUrl(rutaImagen));
      //


      this.file
        .resolveLocalFilesystemUrl(rutaImagen)
        .then((entradaDeArchivo) => {
          let { name, nativeURL } = entradaDeArchivo;
          let ruta = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          nombreDelArchivo = name;

          //esto hay que borrarlo despues
          console.log("ruta: " + ruta);
          console.log("nombredelarchivo: " + nombreDelArchivo);
          console.log("entrada: " + entradaDeArchivo);
          //

          return this.file.readAsArrayBuffer(ruta, nombreDelArchivo);
        })
        .then((buffer) => {
          let imgBlob = new Blob([buffer], {
            type: 'image/jpeg',
          });

          console.log("imgBlob" + imgBlob);

          resolve(imgBlob);
        })
        .catch((e) => reject(e));
    });
  }

  formatearImageData(imagedata):Promise<string> {//se usa para productos

    let filename = imagedata.substring(imagedata.lastIndexOf('/') + 1);
    let path = imagedata.substring(0, imagedata.lastIndexOf('/') + 1);

    console.log(this.file.readAsDataURL(path, filename));

    return this.file.readAsDataURL(path, filename).then((base64data) => {
      console.log("base64data"+base64data);
      return base64data;
    });
  }
}
