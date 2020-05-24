import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash1 = true;
  showSplash2 = false;
  showApp = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      timer(3000).subscribe(() => {
        this.showSplash1 = false;
        this.showSplash2 = true;
        timer(1000).subscribe(() => {
          this.showApp = true;
          timer(1000).subscribe(() => {
            this.showSplash2 = false;
            //this.showApp = true;
          });
        });
      });



    });
  }
}
