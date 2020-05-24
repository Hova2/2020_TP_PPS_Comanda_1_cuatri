import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    SpinnerComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,FormsModule, IonicModule
  ],
  exports: [
    SpinnerComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
