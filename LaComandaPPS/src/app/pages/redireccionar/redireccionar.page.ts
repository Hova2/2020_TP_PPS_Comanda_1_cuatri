import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-redireccionar',
  templateUrl: './redireccionar.page.html',
  styleUrls: ['./redireccionar.page.scss'],
})
export class RedireccionarPage implements OnInit {
  public spinner: boolean = true;
  public login: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,

  ) {
  }

  ngOnInit() {
    /*this.authService.GetCurrentUser().then(user => {
			this.router.navigate(['/splash']);
		})
		.catch(() => {
			this.router.navigate(['/login']);
    });*/

    //esto es un contador de prueba
    timer(3000).subscribe(() => {
      this.spinner = false;
      this.login = true;
    });
  }
}
