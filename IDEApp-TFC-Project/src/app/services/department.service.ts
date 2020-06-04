import { Injectable } from '@angular/core';

// My imports, para la lista de angulary acceso a la db
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Clase department
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  // La lista de departamentos que tiene el centro
  departmentList: AngularFireList<any>;
  // Almacena temporalmente el departamento seleccionado.
  // Al iniciar el servicio esta en blanco
  selectedDepartment: Department;

  constructor(private firebase: AngularFireDatabase) {
    this.selectedDepartment = new Department();
  }

  //Obtener los departamentos
  getDepartments() {
    return (this.departmentList = this.firebase.list('departments'));
  }

  //Insertar un departamento
  insertDepartment(department: Department) {
    this.departmentList.push({
      departmentName: department.departmentName,
      headDepartmentName: department.headDepartmenName
    });
  }
  
  //Actualizar o modificar la info del departamento
  updateDepartment(department: Department){
    this.departmentList.update(department.$key, {
      departmentName: department.departmentName,
      headDepartmentName: department.headDepartmenName
    })
  }

  // Eliminar un departamento
  deleteDepartment($key: string){
    this.departmentList.remove($key);
  }
}
