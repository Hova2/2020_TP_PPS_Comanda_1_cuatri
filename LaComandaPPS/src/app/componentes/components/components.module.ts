import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { ScannerQRComponent } from '../scanner-qr/scanner-qr.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    LoginComponent,
    PopoverComponent,
    ScannerQRComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [
    SpinnerComponent,
    LoginComponent,
    PopoverComponent,
    ScannerQRComponent,
  ],
  entryComponents: [PopoverComponent],
})
export class ComponentsModule {}
