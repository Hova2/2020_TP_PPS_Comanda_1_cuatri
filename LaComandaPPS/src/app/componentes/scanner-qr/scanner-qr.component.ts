import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.component.html',
  styleUrls: ['./scanner-qr.component.scss'],
})
export class ScannerQRComponent implements OnInit {

  codigoEscaneado = null;

  @Output() devolucionCodigo = new EventEmitter();

  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {}

  escanearCodigo() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.codigoEscaneado = barcodeData.text;
        this.devolucionCodigo.emit(this.codigoEscaneado);
      }
    );
  }
}
