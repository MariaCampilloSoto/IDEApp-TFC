import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/models/subject';
import { User } from 'src/app/models/user';
import { Document } from 'src/app/models/document';
import { UserService } from 'src/app/services/user.service';
import { SubjectService } from 'src/app/services/subject.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  isAdmin: any = false;
  isTeacher: any = false;
  isEditor: any = false;

  documentService: DocumentService;
  userService: UserService;
  subjectService: SubjectService;

  documentList: Document[] = [];
  subjectList: Subject[] = [];
  userList: User[] = [];



  constructor(
    documentService: DocumentService,
    userService: UserService,
    subjectService: SubjectService,
    private toastr: ToastrService,
    private authService: AuthService,
    private firebase: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {
    this.documentService = documentService;
    this.userService = userService;
    this.subjectService = subjectService;
  }

  ngOnInit(): void {
    this.getCurrentUser();

    this.subjectService.getSubjects()
    .snapshotChanges()
    .subscribe((item) => {
      this.subjectList = [];
      item.forEach((element) => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.subjectList.push(x as Subject);
      });
    });

    this.documentService
      .getDocuments()
      .snapshotChanges()
      .subscribe((item) => {
        this.documentList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['subjectName'] = this.subjectList.find(subject => subject.$key === x['subjectName']).subjectName
          x['$key'] = element.key;
          this.documentList.push(x as Document);
        });
      });

  }

  onDelete(document) {
    if (confirm('¿Seguro que desea eliminar el documento?')) {
      this.documentService.deleteDocument(document);
      this.toastr.success('Eliminación completada', 'Has eliminado el documento.');
    }
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe((auth) => {
      if (auth) {
        this.authService
          .getUsers()
          .snapshotChanges()
          .subscribe((item) => {
            item.forEach((element) => {
              let user = element.payload.toJSON();
              user['$key'] = element.key;
              if ((user as User).email === auth.email) {
                let role = Object.assign({}, (user as User).role);
                this.isAdmin = role.hasOwnProperty('admin');
                this.isEditor = role.hasOwnProperty('editor');
                this.isTeacher = role.hasOwnProperty('teacher');
              }
            });
          });
      } else {
        console.log('NOT user logged --> problem');
      }
    });
  }
}
