import { Component, OnInit } from '@angular/core';
import { Evaluation } from 'src/app/models/evaluation';
import { SubjectStudentService } from 'src/app/services/subject-student.service';
import { SubjectStudentEvaluationService } from 'src/app/services/subject-student-evaluation.service';
import { element } from 'protractor';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  evaluationList: Evaluation[];
  subjectList: string[];
  studentListBySubject: string[];
  subjectStudentService: SubjectStudentService;
  subjectStudentEvaluationService: SubjectStudentEvaluationService;

  constructor(
    subjectStudentService: SubjectStudentService,
    subjectStudentEvaluationService: SubjectStudentEvaluationService
  ) {
    this.subjectStudentService = subjectStudentService;
    this.subjectStudentEvaluationService = subjectStudentEvaluationService;
  }

  ngOnInit(): void {
    console.log(
      this.subjectStudentService
        .getSubjects()
        .snapshotChanges()
        .subscribe((item) => {
          item.forEach(element =>{
            console.log(element.payload.val())
          })
        })
    );
  }
}
