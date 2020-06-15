import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Document } from '../models/document';
import { UserService } from './user.service';
import { SubjectService } from './subject.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentList: AngularFireList<any>;

  userService: UserService;
  subjectService: SubjectService;

  constructor(
    private firebase: AngularFireDatabase,
    private storage: AngularFireStorage,
    userService: UserService,
    subjectService: SubjectService
  ) {
    this.userService = userService;
    this.subjectService = subjectService;
  }

  getDocuments(){
    return (this.documentList = this.firebase.list('documents'));
  }

 

  insertDocument(document: Document) {
    let newDocumentKey = this.firebase.database
      .ref()
      .child(`documents`)///${document.url}
      .push().key;
    let update = {};
    update[
      'documents/' + newDocumentKey //+ document.url + '/'
    ] = document;
    this.firebase.database.ref().update(update);
  }

  updateDocument(document: Document) {
    this.documentList.update(document.$key, {
      documentName: document.documentName,
      userNameerName: document.userName,
      subjectName: document.subjectName,
    });
  }

  deleteDocument(document: Document) {
    this.getDocuments().remove(document.$key);
    this.storage.ref(`${document.url}/${document.documentName}`).delete()
  }

}
