import { Injectable } from '@angular/core';
import { User } from '../models/userClass';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: AngularFireList<any>;
  selectedUser: User;

  constructor(private firebase: AngularFireDatabase) {
    this.selectedUser = new User();
  }

  getAllUsers(){
    return (this.userList = this.firebase.list('users'));
  }

  insertUser(user: User){
    this.userList.push(user);
  }

  updateUser(user: User){
    this.userList.update(user.$key, user);
  }
}
