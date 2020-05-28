import { Component, OnInit } from '@angular/core';
import { FireDbService } from '../fire-db.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects = []

  constructor(public db: FireDbService) { }

  ngOnInit(): void {
    this.db.getSubjects().subscribe(snap => {
      this.subjects = [];
      snap.forEach(s => {
        let subject: any = s.payload.val();
        subject.key = s.key;

        this.subjects.push(subject);
        console.log(s)
      })
      console.log('subjects: ', this.subjects)
    });
  }

}
