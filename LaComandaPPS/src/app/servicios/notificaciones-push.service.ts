import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FCM } from '@ionic-native/fcm/ngx';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesPushService {
  constructor(
    private fcm: FCM,
    private afs: AngularFirestore,
    private as: AuthService
  ) {}

  public async getToken() {
    const token = await this.fcm.getToken();

    return this.guardarTokenEnLaBD(token);
  }

  public escuchardorDeNotificaciones() {
    return this.fcm.onNotification();
  }

  public async borrarClienteDeLista() {
    const token = await this.fcm.getToken();
    const docUsuario = await this.as.datosUsuarioLoguado();
    const dispositivosRef = this.afs.collection('dispositivos');
    const doc = await dispositivosRef.doc(token).get().toPromise();
    const rol = docUsuario.data().rol;
    if (doc.exists && rol === 'cliente') {
      dispositivosRef.doc(token).delete();
    }
  }

  private async guardarTokenEnLaBD(token: string) {
    let salida = null;
    const docUsuario = await this.as.datosUsuarioLoguado();
    const rol = docUsuario.data().rol;

    if (token) {
      const dispositivosRef = this.afs.collection('dispositivos');
      const doc = await dispositivosRef.doc(token).get().toPromise();
      if (doc.exists && rol !== 'cliente') {
        salida = dispositivosRef.doc(token).update({ rol: rol });
      } else if (doc.exists && rol === 'cliente') {
        salida = dispositivosRef.doc(token).delete();
      } else if (!doc.exists && rol !== 'cliente') {
        const docData = {
          token,
          rol,
        };
        salida = dispositivosRef.doc(token).set(docData);
      }
    }

    return salida;
  }
}
