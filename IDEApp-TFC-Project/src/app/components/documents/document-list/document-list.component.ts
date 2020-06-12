import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/models/subject';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SubjectService } from 'src/app/services/subject.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documentList;
  documentService: DocumentService;
  userService: UserService;
  subjectService: SubjectService;
  private toastr: ToastrService;

  constructor(
    documentService: DocumentService,
    userService: UserService,
    subjectService: SubjectService,
    toastr: ToastrService,
    private firebase: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {
    this.documentService = documentService;
    this.userService = userService;
    this.subjectService = subjectService;
    this.toastr = toastr;
  }

  ngOnInit(): void {
    this.getMarker().then(res=> console.log(res))
  }
      async getMarker() {
        const snapshot = await this.firestore.collection('uploads').get()
        return snapshot.pipe(map(doc => doc));
    }

  onDelete($key) {
    if (confirm('Are you sure you want to delete it?')) {
      this.documentService.deleteDocument($key);
      this.toastr.success('succesfull Operation', 'Departamento eliminado');
    }
  }

  getDocuments() {
    let subjectList: Subject[] = [];
    let userList: User[] = [];

    this.subjectService
      .getSubjects()
      .snapshotChanges()
      .subscribe((item) => {
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          subjectList.push(x as Subject);
        });
      });

    this.userService
      .getAllUsers()
      .snapshotChanges()
      .subscribe((item) => {
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          userList.push(x as User);
        });
      });

    for (let subject of subjectList) {
      for (let user of userList) {
        this.firebase
          .list(`documents/${subject.$key}/${user.$key}`)
          .snapshotChanges()
          .subscribe((item) => {
            item.forEach((element) => {
              let x = element.payload.toJSON();
              x['$key'] = element.key;
              this.documentList.push(x as Document);
            });
          });
      }
    }

    console.log(this.documentList);
  }
}
