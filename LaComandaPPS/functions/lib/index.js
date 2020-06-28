"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);
exports.notificacionEntradaLocal = functions.firestore
    .document('/listaespera/{listaEsperaID}')
    .onCreate(async (doc, context) => {
    const notificacion = {
        notification: {
            title: 'Notificacion metre',
            body: 'Se agrego un nuevo cliente a la lista de espera',
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
//# sourceMappingURL=index.js.map