import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Contacto } from '../models/contacto';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userList: AngularFireList<any>;

  selectedUser: User;

  contact1: Contacto;
  contact2: Contacto;
  department: Department;

  constructor(private firebase: AngularFireDatabase) {
    this.selectedUser = new User();
    this.contact1 = new Contacto();
    this.contact2 = new Contacto();
    this.department = new Department();
  }

  getAllUsers() {
    return (this.userList = this.firebase.list('users'));
  }

  insertUser(user: User) {
    let name = user.name;
    let surname1 = user.surname1;
    let surname2 = user.surname2 || '';
    let email = user.email;
    let password = user.password;
    console.log('user: ', user);
    console.log('user.role: ', user.role);
    let role = user.role;
    if (
      user.role.hasOwnProperty('admin') ||
      user.role.hasOwnProperty('editor')
    ) {
      this.userList.push({
        name,
        surname1,
        surname2,
        email,
        password,
        role,
      });
    } else if (user.role.hasOwnProperty('teacher')) {
      let department = Object.assign({}, this.department);
      this.userList.push({
        name,
        surname1,
        surname2,
        email,
        password,
        role,
        dni: user.dni,
        phone: user.phone,
        address: user.address,
        department,
        active: true,
      });
    } else if (
      !user.role.hasOwnProperty('teacher') ||
      !user.role.hasOwnProperty('admin') ||
      !user.role.hasOwnProperty('editor')
    ) {
      let contact1 = Object.assign({}, this.contact1);
      let contact2 = Object.assign({}, this.contact2);
      this.userList.push({
        name,
        surname1,
        surname2,
        email,
        password,
        role,
        contact1,
        contact2,
      });
    }
  }

  updateUser(user: User) {
    let name = user.name;
    let surname1 = user.surname1;
    let surname2 = user.surname2 || '';
    let email = user.email;
    let password = user.password;
    let role = user.role;
    if (user.role.hasOwnProperty('teacher')) {
      let department = Object.assign({}, this.department);
      this.userList.update(user.$key, {
        name,
        surname1,
        surname2,
        email,
        password,
        role,
        dni: user.dni,
        phone: user.phone,
        address: user.address,
        department,
        active: true,
      });
    } else if (
      !user.role.hasOwnProperty('teacher') ||
      !user.role.hasOwnProperty('admin') ||
      !user.role.hasOwnProperty('editor')
    ) {
      let contact1 = Object.assign({}, this.contact1);
      let contact2 = Object.assign({}, this.contact2);
      this.userList.update(user.$key, {
        name,
        surname1,
        surname2,
        email,
        password,
        role,
        contact1,
        contact2,
      });
    }
  }

  deleteUser($key: string) {
    this.userList.remove($key);
  }
}
