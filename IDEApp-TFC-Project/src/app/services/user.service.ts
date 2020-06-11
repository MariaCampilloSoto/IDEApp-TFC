import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Contacto } from '../models/contacto';
import { Department } from '../models/department';
import { SubjectStudentService } from './subject-student.service';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userList: AngularFireList<any>;

  selectedUser: User;

  contact1: Contacto;
  contact2: Contacto;
  department: Department;

  subjectStudentService: SubjectStudentService;

  constructor(
    private firebase: AngularFireDatabase,
    subjectStudentService: SubjectStudentService
  ) {
    this.selectedUser = new User();
    this.contact1 = new Contacto();
    this.contact2 = new Contacto();
    this.department = new Department();

    this.subjectStudentService = subjectStudentService;
  }

  getAllUsers() {
    return (this.userList = this.firebase.list('users'));
  }

  insertUserInSubjects(user: User, subjectList: string[]) {
    let name = user.name;
    let surname1 = user.surname1;
    let surname2 = user.surname2 || '';
    let email = user.email;
    let password = user.password;
    console.log('user: ', user);
    console.log('user.role: ', user.role);
    let role = user.role;
    let newKey = this.userList.push({
      name,
      surname1,
      surname2,
      email,
      password,
      role,
    }).key;
    if (user.role.hasOwnProperty('teacher')) {
      let department = Object.assign({}, this.department);
      this.userList.update(newKey, {
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
      this.userList.update(newKey, {
        contact1,
        contact2,
      });

      this.subjectStudentService.insertStudentInSubject(
        newKey,
        subjectList
      );
    }
  }

  updateUser(user: User) {
    let name = user.name;
    let surname1 = user.surname1;
    let surname2 = user.surname2 || '';
    let email = user.email;
    let password = user.password;
    let role = user.role;
    this.userList.update(user.$key, {
      name,
      surname1,
      surname2,
      email,
      password,
      role,
    });

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
