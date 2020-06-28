import { Injectable, ViewContainerRef } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScanResult,
} from '@ionic-native/barcode-scanner/ngx';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  public arrayDeDatos = new Array<string>();

  constructor(private barcodeScanner: BarcodeScanner) {}

  public escanear(): Promise<BarcodeScanResult> {
    return this.barcodeScanner.scan({ formats: 'QR_CODE,PDF_417' });
  }
}
