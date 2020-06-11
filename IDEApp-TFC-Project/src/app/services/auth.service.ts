import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userList: AngularFireList<any>;

  constructor(
    private auth: AngularFireAuth,
    private firebase: AngularFireDatabase
  ) {}

  getUsers() {
    return (this.userList = this.firebase.list('users'));
  }

  loginRegisterUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(email, pass)
        .catch((err) => this.auth.signInWithEmailAndPassword(email, pass))
        .catch((err) => {
          alert(`Error:  ${err.message}`);
          reject(err);
        });
    });
  }

  logoutUser() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((auth) => auth));
  }
}
