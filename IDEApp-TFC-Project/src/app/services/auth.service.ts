import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { User } from '../models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(
    private auth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private angularFire: AngularFireModule
  ) {}

  registerUser(email: string, pass: string) {
    this.auth.createUserWithEmailAndPassword(email, pass);
    this.auth.signOut();
    // return new Promise((resolve, reject) => {
    //   this.auth
    //     .createUserWithEmailAndPassword(email, pass)
    //     // Los datos del usuario -> userData
    //     .then((userData) => {
    //       resolve(userData);

    //       //this.updateuserData(userData.user);
    //     })
    //     .catch((err) => console.log('error: ', err));
    // });
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

  // private updateuserData(user) {
  //   let newUser: User;

  //   if (user.role.hasOwnProperty('teacher')) {
  //     newUser.dni = user.dni;
  //     newUser.phone = user.phone;
  //     newUser.address = user.address;
  //     newUser.department = user.department;
  //     newUser.active = true;
  //   } else if (
  //     !user.role.hasOwnProperty('teacher') &&
  //     !user.role.hasOwnProperty('admin') &&
  //     !user.role.hasOwnProperty('editor')
  //   ) {
  //     newUser.contact1 = user.contact1;
  //     newUser.contact2 = user.contact2;
  //   }

  //   newUser.$key = user.$key;
  //   newUser.name = user.name;
  //   newUser.surname1 = user.surname1;
  //   newUser.surname2 = user.surname2;
  //   newUser.password = user.password;
  //   newUser.email = user.email;
  //   newUser.role = user.role;
  //   this.userService.insertUser(newUser);
  // }

  // isUserRole(userUid) {
  //   return this.angularFirestore
  //     .doc<User>(`users/$${userUid}`)
  //     .valueChanges();
  // }
}
