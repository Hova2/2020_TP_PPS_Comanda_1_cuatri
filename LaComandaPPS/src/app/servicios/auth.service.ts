import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  public logueoConEmail(email: string, pwd: string) {
		return new Promise((resolve, reject) => {
			this.afsAuth.signInWithEmailAndPassword(email, pwd)
				.then(userData => {					
						resolve(userData);
            console.log('Login success', userData);
            this.router.navigate(['/principal']);						
				})
				.catch(error => reject(error));
		});
	}

	public logout(): void {
    this.afsAuth.signOut();	
    this.router.navigate(['/']);	
  }	
}
