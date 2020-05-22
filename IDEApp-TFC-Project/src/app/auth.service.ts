import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email = '';
  pass = '';

  constructor(public auth: AngularFireAuth) {}

  user = this.auth.authState.pipe(
    map((authState) => {
      console.log('authState: ', authState);
      if (authState) {
        return authState;
      } else {
        return null;
      }
    })
  );

  login() {
    console.log('login!');
    this.auth.signInWithEmailAndPassword(this.email, this.pass).then(user=> {
      console.log('user login: ', user)
    }).catch(error => {
      console.log('error en login: ', error)
    })
  }
  logout() {
    console.log('logout!');
    this.auth.signOut();
    this.email = '';
    this.pass = '';
  }
}
