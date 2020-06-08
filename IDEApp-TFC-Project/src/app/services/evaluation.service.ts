import { Injectable } from '@angular/core';
import {
  AngularFireList,
  AngularFireDatabase,
} from '@angular/fire/database/database';
import { Evaluation } from '../models/evaluation';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  evaluationList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {}

  getEvaluations(){
    return this.evaluationList = this.firebase.list('evaluations');
  }

  insertEvaluation(evaluation: Evaluation){
    this.evaluationList.push({
      schoolYear: evaluation.schoolYear,
      marks: evaluation.marks,
     // numberEvaluation: evaluation.numberEvaluation
    })
  }
}
