import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const SENDGRID_API_KEY = functions.config().sendgrid.key;
admin.initializeApp(functions.config().firebase);
sgMail.setApiKey(SENDGRID_API_KEY);

exports.notificacionEntradaLocal = functions.firestore
  .document('/listaespera/{listaEsperaID}')
  .onCreate(async (doc, context) => {
    const notificacion = {
      notification: {
        title: 'Notificacion metre',
        body: 'Solicitud de ingreso al local',
      },
    };

    const dispositivos = await admin
      .firestore()
      .collection('dispositivos')
      .where('rol', '==', 'metre')
      .get();

    const tokens = new Array<string>();

    dispositivos.forEach((el) => {
      const tokenTmp = el.data().token;
      tokens.push(tokenTmp);
    });

    return admin.messaging().sendToDevice(tokens, notificacion);
  });

exports.notificacionRegistroUsuario = functions.firestore
  .document('/usuarios/{usuarioID}')
  .onCreate(async (doc, context) => {
    let salida = null;

    if (doc.data().rol === 'cliente') {
      const notificacion = {
        notification: {
          title: 'Notificacion socio',
          body: 'Solucitud de registro de cliente',
        },
      };

      const dispositivos = await admin
        .firestore()
        .collection('dispositivos')
        .where('rol', '==', 'socio')
        .get();

      const tokens = new Array<string>();

      dispositivos.forEach((el) => {
        const tokenTmp = el.data().token;
        tokens.push(tokenTmp);
      });

      salida = admin.messaging().sendToDevice(tokens, notificacion);
    }

    return salida;
  });

exports.enviarEmailRegistro = functions.firestore
  .document('/usuarios/{usuarioID}')
  .onUpdate((change, context) => {
    let salida = null;
    const usuario = change.after.data();

    if (usuario.rol === 'cliente') {
      const msg = {
        to: usuario.email,
        from: 'noresponder@lodenikola.com.ar',
        templateId: '',
        dynamicTemplateData: {
          subject: '',
          nombre: usuario.nombre,
          apellido: usuario.apellido,
        },
      };
      if (usuario.estado === 'habilitado') {
        msg.dynamicTemplateData.subject = 'Lo de Nikola - Solicitud aceptada';
        msg.templateId = 'd-e580b6f6c6154c0985640ac9170e7e6c';
        salida = sgMail.send(msg);
      } else if (usuario.estado === 'deshabilitado') {
        msg.dynamicTemplateData.subject = 'Lo de Nikola - Solicitud rechazada';
        msg.templateId = 'd-f1e235f16cbb40a691b283cbdffeb966';
        salida = sgMail.send(msg);
      }
    }

    return salida;
  });
