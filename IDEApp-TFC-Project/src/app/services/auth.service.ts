import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user';

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
      this.auth.signInWithEmailAndPassword(email, pass).catch((err) => {
        let isLogin = false;
        this.getUsers()
          .snapshotChanges()
          .subscribe((item) => {
            item.forEach((element) => {
              let x = element.payload.toJSON();
              if ((x as User).email === email) {
                this.auth.createUserWithEmailAndPassword(email, pass);
                isLogin = true;
              }
            });
          });
        if (!isLogin) {
          alert(err)
        }
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
