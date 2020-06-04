import { Component, OnInit } from '@angular/core';

//Import servicio y clase de Department (dos maneras de referenciar carpetas)
import { DepartmentService } from '../../../services/department.service';
import { Department } from 'src/app/models/department';

// Formulario
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departmentService: DepartmentService;

  constructor(departmentService : DepartmentService, private toastr: ToastrService) { 
    this.departmentService = departmentService;
  }

  ngOnInit(): void {
    this.departmentService.getDepartments();
    this.resetForm();
  }

  onSubmit(departmentForm: NgForm){
    if(departmentForm.value.$key != null){
      this.departmentService.insertDepartment(departmentForm.value);
    } else {
      this.departmentService.updateDepartment(departmentForm.value);
    }
    this.resetForm(departmentForm);
    this.toastr.success('Successfull Operation')
  }

  resetForm(departmentForm?: NgForm){
    if(departmentForm != null){
      departmentForm.reset();
      this.departmentService.selectedDepartment = new Department();
    }
  }

}
