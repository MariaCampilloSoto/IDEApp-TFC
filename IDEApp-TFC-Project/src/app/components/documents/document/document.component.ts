import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/storage';

//Service

//Subject Class
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'src/app/models/subject';
import { User } from 'src/app/models/user';
import { DocumentService } from 'src/app/services/document.service';
import { Document } from 'src/app/models/document';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  subjectService: SubjectService;
  userService: UserService;
  authService: AuthService;
  documentService: DocumentService;

  // this.subjectOption era util para poner en vacio lo de la asignatura

  subjectList: Subject[];
  currentUser: User;
  document: Document;

  uploadPercent: Observable<number>;
  urlFile: Observable<string>;

  constructor(
    subjectService: SubjectService,
    userService: UserService,
    authService: AuthService,
    documentService: DocumentService,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {
    this.subjectService = subjectService;
    this.userService = userService;
    this.authService = authService;
    this.documentService = documentService;

    this.subjectList = [];
    this.currentUser = new User();
    this.document = new Document();
  }

  ngOnInit(): void {
    this.subjectService.getSubjects();
    this.userService.getAllUsers();
    this.resetForm();

    this.subjectService
      .getSubjects()
      .snapshotChanges()
      .subscribe((item) => {
        this.subjectList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.subjectList.push(x as Subject);
        });
      });

    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe((auth) => {
      this.userService
        .getAllUsers()
        .snapshotChanges()
        .subscribe((item) => {
          item.forEach((element) => {
            let user = element.payload.toJSON();
            user['$key'] = element.key;
            try{
              if ((user as User).email === auth.email) {
                this.currentUser = Object.assign({}, user as User);
                this.document.userName = `${this.currentUser.name} ${this.currentUser.surname1} ${this.currentUser.surname2}`;
              }
            } catch(err){
              
            }
          });
        });
    });
  }

  onSubmit(documentForm: NgForm) {
    this.document.url = `${this.document.subjectName}/${this.document.userName}`;
    this.documentService.insertDocument(this.document);
    this.resetForm(documentForm);
    this.toastr.success('Operación completada');
  }

  onUpload(event) {
    const file = event.target.files[0];
    const filePath = `${this.document.subjectName}/${this.document.userName}/${this.document.documentName}`; //${this.document.documentName}
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.urlFile = ref.getDownloadURL())))
      .subscribe();
  }

  resetForm(subjectForm?: NgForm) {
    this.getCurrentUser();
    this.document = new Document();
    this.uploadPercent= new Observable<number>();
    this.urlFile= new Observable<string>();
  }
}
