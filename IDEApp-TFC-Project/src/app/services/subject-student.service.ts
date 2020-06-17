import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectStudentService {
  subjectsList: AngularFireList<any>; // Lista de asignaturas
  studentsListBySubject: AngularFireList<any>; // Lista de estudiantes
  subjectStudentsList: AngularFireList<any>; // Lista de asignatura->estudiantes

  constructor(private firebase: AngularFireDatabase) {
  }

  getSubjects() {
    return (this.subjectsList = this.firebase.list('sign-up'));
  }

  getStudentsBySubject(subject: Subject) {
    return this.firebase.list(`sign-up/${subject.$key}`);
  }

  insertSubject(subjectKey: string) {
    this.subjectsList.update(subjectKey, {});
  }

  insertStudentInSubject(
    studentKey: string,
    subjectKeys: string[]
  ) {
    subjectKeys.forEach((key) => {
      this.subjectsList.update(key, {
        [studentKey]: true,
      });
    });
  }
}
