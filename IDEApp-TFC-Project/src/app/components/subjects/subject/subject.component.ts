import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//Service
import{ SubjectService } from '../../../services/subject.service';

//Subject Class
import{ Subject } from '../../../models/subject'


@Component({
  selector: 'app-subject-comp',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  
  // subjectService: SubjectService;
  //subjectService lo hace private pero da error asi que public it is for ahora
  
  constructor(private subjectService: SubjectService) {  }

  ngOnInit(): void {
    this.subjectService.getSubjects();
    this.resetForm();
  }

  onSubmit (subjectForm: NgForm){
    this.subjectService.insertSubject(subjectForm.value);
    this.resetForm(subjectForm);
  }

  resetForm(subjectForm?:NgForm){
    if(subjectForm != null) subjectForm.reset();
    this.subjectService.selectedSubject=new Subject();
  }

}
