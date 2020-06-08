import { Component, OnInit } from '@angular/core';

// Service
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departmentList: Department[];

  departmentService: DepartmentService;
  private toastr: ToastrService;

  constructor(departmentService: DepartmentService, toastr: ToastrService) {
    this.departmentService = departmentService;
    this.toastr = toastr;
  }

  ngOnInit() {
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
    if (confirm('Are you sure you want to delete it?')) {
      this.departmentService.deleteDepartment($key);
      this.toastr.success('succesfull Operation', 'Departamento eliminado');
    }
  }
}
