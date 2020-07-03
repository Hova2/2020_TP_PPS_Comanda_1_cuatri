"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
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
    const tokens = new Array();
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
        const tokens = new Array();
        dispositivos.forEach((el) => {
            const tokenTmp = el.data().token;
            tokens.push(tokenTmp);
        });
        salida = admin.messaging().sendToDevice(tokens, notificacion);
    }
    return salida;
});
exports.notificacionConsultaMozo = functions.firestore
    .document('/mensajes/{mensajeID}')
    .onCreate(async (doc, context) => {
    let salida = null;
    const notificacion = {
        notification: {
            title: 'Notificacion mozo',
            body: 'Un cliente realizo una consulta',
        },
    };
    const dispositivos = await admin
        .firestore()
        .collection('dispositivos')
        .where('rol', '==', 'mozo')
        .get();
    const tokens = new Array();
    dispositivos.forEach((el) => {
        const tokenTmp = el.data().token;
        tokens.push(tokenTmp);
    });
    salida = admin.messaging().sendToDevice(tokens, notificacion);
    return salida;
});
exports.notificacionMozoPedidoListo = functions.firestore
    .document('/pedidos/{pedidosID}')
    .onUpdate(async (change, context) => {
    let salida = null;
    if (change.after.data().estado === 'listo') {
        const notificacion = {
            notification: {
                title: 'Notificacion mozo',
                body: 'Un pedido esta listo para servir',
            },
        };
        const dispositivos = await admin
            .firestore()
            .collection('dispositivos')
            .where('rol', '==', 'mozo')
            .get();
        const tokens = new Array();
        dispositivos.forEach((el) => {
            const tokenTmp = el.data().token;
            tokens.push(tokenTmp);
        });
        salida = admin.messaging().sendToDevice(tokens, notificacion);
    }
    return salida;
});
exports.notificacionCocinero = functions.firestore
    .document('/pedidos/{pedidosID}')
    .onUpdate(async (change, context) => {
    let salida = null;
    if (change.after.data().estado === 'pendiente') {
        let contProductos = 0;
        change.after.data().productos.forEach((prod) => {
            if (prod.quienElabora === 'bartender') {
                contProductos++;
            }
        });
        if (contProductos > 0) {
            const notificacion = {
                notification: {
                    title: 'Notificacion bartender',
                    body: 'Pedido nuevo',
                },
            };
            const dispositivos = await admin
                .firestore()
                .collection('dispositivos')
                .where('rol', '==', 'bartender')
                .get();
            const tokens = new Array();
            dispositivos.forEach((el) => {
                const tokenTmp = el.data().token;
                tokens.push(tokenTmp);
            });
            salida = admin.messaging().sendToDevice(tokens, notificacion);
        }
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
        }
        else if (usuario.estado === 'deshabilitado') {
            msg.dynamicTemplateData.subject = 'Lo de Nikola - Solicitud rechazada';
            msg.templateId = 'd-f1e235f16cbb40a691b283cbdffeb966';
            salida = sgMail.send(msg);
        }
    }
    return salida;
});
//# sourceMappingURL=index.js.map