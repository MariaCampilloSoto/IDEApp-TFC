import { Injectable } from '@angular/core';

//mis imports
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Subject } from '../models/subject';
import { SubjectStudentService } from './subject-student.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  //lista de asignaturas
  subjectList: AngularFireList<any>;
  //almacena temporalmente el dato seleccionado
  //Al iniciar el servicio esta en blanco
  selectedSubject: Subject;

  subjectStudentService: SubjectStudentService;

  constructor(
    private firebase: AngularFireDatabase,
    subjectStudentService: SubjectStudentService
  ) {
    this.selectedSubject = new Subject();
    this.subjectStudentService = subjectStudentService;
  }

  //obtiene el listado de asignaturas
  getSubjects() {
    //obtengo de firebase la lista con todas las asignaturas
    this.subjectList = this.firebase.list('subjects');
    this.subjectStudentService.getSubjects();
    this.subjectList.snapshotChanges().subscribe((item) => {
      item.forEach((element) => {
        this.subjectStudentService.insertSubject(element.key);
      });
    });
    return this.subjectList;
    //soy boba y no pongo el return y me pregunto porque no me va
  }
  //crea una nueva asignatura
  insertSubject(subject: Subject) {
    let subjectKey = this.subjectList.push({}).key;
    this.subjectList.update(subjectKey, {
      schoolYear: subject.schoolYear,
      teacherName: subject.teacherName,
      subjectName: subject.subjectName,
    });
    this.subjectStudentService.insertSubject(subjectKey);
  }
  //actualiza/modifica una asignatura
  updateSubject(subject: Subject) {
    this.subjectList.update(subject.$key, {
      schoolYear: subject.schoolYear,
      teacherName: subject.teacherName,
      subjectName: subject.subjectName,
    });
  }

  //borra una asignatura
  deleteSubject($key: string) {
    this.subjectList.remove($key);
  }
}
