import { Injectable } from '@angular/core';
import { SubjectStudentService } from './subject-student.service';
import { Evaluation } from '../models/evaluation';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class SubjectStudentEvaluationService {
  evaluationListByStudent: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {}

  getEvaluationsByStudent(subjectkey: string, studentKey: string) {
    return (this.evaluationListByStudent = this.firebase.list(
      `sing-up/${subjectkey}/${studentKey}`
    ));
  }

  insertEvaluationInStudent(
    subjectKey: string,
    studentkey: string,
    evaluation: Evaluation
  ) {
    this.firebase.database.ref(`sing-up/${subjectKey}/${studentkey}`).set({
      schoolYear: evaluation.schoolYear,
      numberEvaluation: evaluation.numberEvaluation,
      mark: evaluation.mark,
    });
  }
}
