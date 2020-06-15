import { Component, OnInit } from '@angular/core';

// Service
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departmentList: Department[];

  departmentService: DepartmentService;
  private toastr: ToastrService;

  isAdmin: any = false;
  isTeacher: any = false;
  isEditor: any = false;

  constructor(departmentService: DepartmentService, toastr: ToastrService, private authService: AuthService) {
    this.departmentService = departmentService;
    this.toastr = toastr;
  }

  ngOnInit() {
    this.getCurrentUser();
    this.departmentService
      .getDepartments()
      .snapshotChanges()
      .subscribe((item) => {
        this.departmentList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.departmentList.push(x as Department);
        });
      });
  }

  onEdit(department: Department) {
    this.departmentService.selectedDepartment = Object.assign({}, department);
  }

  onDelete($key) {
    if (confirm('¿Seguro que desea eliminar el departamento?')) {
      this.departmentService.deleteDepartment($key);
      this.toastr.success('Eliminación completada', 'Has eliminado el departamento.');
    }
  }


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
                this.isAdmin = role.hasOwnProperty('admin');
                this.isEditor = role.hasOwnProperty('editor');
                this.isTeacher = role.hasOwnProperty('teacher');
              }
            });
          });
      } else {
      }
    });
  }
}
