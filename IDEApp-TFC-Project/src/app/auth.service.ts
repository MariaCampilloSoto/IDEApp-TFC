import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { FireDbService } from './fire-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email = '';
  pass = '';
  authUser = null;

  constructor(public auth: AngularFireAuth,
              private router: Router,
              private db: FireDbService) { }

  user = this.auth.authState.pipe ( map( authState => {
    console.log('authState: ', authState);
    if (authState) {
      this.authUser = authState;
      return authState;
    } else {
      return null;
    }
  } ))

  login(){
    console.log('login!');
    return this.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then( user => {
      console.log('user logado con email: ', user);
      this.email = '';
      this.pass = '';
      this.authUser = user.user;
      this.db.updateUserData(user.user);
    })    
  }
  

  logout(){
    console.log('logout!');
    this.auth.signOut();
    this.email = '';
    this.pass = '';
    this.router.navigate(['/']);
  }

}
