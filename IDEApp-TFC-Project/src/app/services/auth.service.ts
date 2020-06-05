import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.auth
        .createUserWithEmailAndPassword(email, pass)
        .then((userData) => {
          resolve(userData);
          this.updateuserData(userData.user);
        })
        .catch((err) => console.log('error: ', err));
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, pass).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    });
  }

  logoutUser() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((auth) => auth));
  }

  private updateuserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `users/${user.$key}`
    );
    const data: UserInterface = {
      $key: user.$key,
      name: user.name,
      surname1: user.surname1,
      surname2: user.surname2,
      password: user.password,
      email: user.email,
      role: {
        
      },
    };

    return userRef.set(data, { merge: true });
  }

  isUserRole(userUid) {
    return this.angularFirestore
      .doc<UserInterface>(`users/${userUid}`)
      .valueChanges();
  }
}
