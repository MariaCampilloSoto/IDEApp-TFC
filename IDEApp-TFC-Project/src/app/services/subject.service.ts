import {
  Injectable
} from '@angular/core';

//mis imports
import {  AngularFireDatabase,  AngularFireList } from '@angular/fire/database';

import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {
  //lista de asignaturas
  subjectList: AngularFireList < any > ;
  //almacena temporalmente el dato seleccionado 
  //Al iniciar el servicio esta en blanco
  selectedSubject: Subject;

  constructor(private firebase: AngularFireDatabase) { 
    this.selectedSubject = new Subject();
  }

  //obtiene el listado de asignaturas
  getSubjects() {
    //obtengo de firebase la lista con todas las asignaturas
    this.subjectList = this.firebase.list('subjects');
  }
  //crea una nueva asignatura
  insertSubject(subject: Subject) {
    this.subjectList.push({
      idSubject: subject.idSubject,
      idSchoolYear: subject.idSchoolYear,
      idTeacher: subject.idTeacher,
      name: subject.name

    });
  }
  //actualiza/modifica una asignatura
  updateSubject(subject: Subject) {
    this.subjectList.update(subject.$key, {
      idSubject: subject.idSubject,
      idSchoolYear: subject.idSchoolYear,
      idTeacher: subject.idTeacher,
      name: subject.name
    })

  }

  //borra una asignatura
  deleteSubject($key: string) {
    this.subjectList.remove($key);
  }


}
