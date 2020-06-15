import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Contacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userService: UserService;

  userList: User[];
  roleList: string[];

  isAdmin: any = false;
  isTeacher: any = false;
  isEditor: any = false;
  isCurso: any = true;

  userRoleSelected: string;
  editUser: User;
  isContact1: any = false;
  contact1: Contacto;
  isContact2: any = false;
  contact2: Contacto;

  constructor(userService: UserService, private authService: AuthService) {
    this.userService = userService;
    this.userList = [];
    this.roleList = ['', 'Administrador', 'Editor', 'Profesor', 'Alumno'];
    this.userRoleSelected = '';
    this.editUser = new User();
    this.contact1 = new Contacto();
    this.contact2 = new Contacto();
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getListadoUsersByRole();
  }

  onEdit(user: User) {
    try {
      document.getElementById('editarUser').style.display = 'block';
    } catch (error) {}
    this.editUser = user;
    this.isContact1 = this.editUser.hasOwnProperty('contact1') ? true : false;
    if (this.isContact1) {
      this.contact1 = this.editUser.contact1;
    }
    this.isContact2 = this.editUser.hasOwnProperty('contact2') ? true : false;
    if (this.isContact2) {
      this.contact2 = this.editUser.contact2;
    }
    if (!this.editUser.hasOwnProperty('role')) {
      this.isEditor = false;
      this.isTeacher = false;
      this.isAdmin = false;
    } else if (this.editUser.role.hasOwnProperty('admin')) {
      this.isEditor = false;
      this.isTeacher = false;
      this.isAdmin = true;
    } else if (this.editUser.role.hasOwnProperty('editor')) {
      this.isEditor = true;
      this.isTeacher = false;
      this.isAdmin = false;
    } else if (this.editUser.role.hasOwnProperty('teacher')) {
      this.isEditor = false;
      this.isTeacher = true;
      this.isAdmin = false;
    }
  }

  onSubmit(registerForm: NgForm) {
    if (this.contact1.hasOwnProperty('tutor')) {
      registerForm.value.contact1 = this.contact1;
    }
    if (this.contact2.hasOwnProperty('tutor')) {
      registerForm.value.contact2 = this.contact2;
    }
    this.userService.updateUser(registerForm.value);

    try {
      document.getElementById('editarUser').style.display = 'none';
    } catch (error) {}
  }

  getListadoUsersByRole() {
    this.userService
      .getAllUsers()
      .snapshotChanges()
      .subscribe((item) => {
        this.userList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;

          if (!x.hasOwnProperty('role')) {
            x['roleName'] = 'Alumno';
          } else if ((x as User).role.hasOwnProperty('admin')) {
            x['roleName'] = 'Administrador';
          } else if ((x as User).role.hasOwnProperty('editor')) {
            x['roleName'] = 'Editor';
          } else if ((x as User).role.hasOwnProperty('teacher')) {
            x['roleName'] = 'Profesor';
          }

          if (
            this.userRoleSelected === x['roleName'] ||
            this.userRoleSelected === ''
          ) {
            this.userList.push(x as User);
            this.isCurso =
              this.userRoleSelected === 'Alumno' ||
              this.userRoleSelected === '';
          }
        });
      });
  }

  // Obtener el usuario actual y comprobar su role
  getCurrentUser() {
    this.authService.isAuth().subscribe((auth) => {
      if (auth) {
        this.authService
          .getUsers()
          .snapshotChanges()
          .subscribe((item) => {
            item.forEach((element) => {
              let user = element.payload.toJSON();
              user['$key'] = element.key;
              if ((user as User).email === auth.email) {
                let role = Object.assign({}, (user as User).role);
              }
            });
          });
      } else {
      }
    });
  }
}
