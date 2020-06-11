import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Document } from '../models/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentList: AngularFireList<any>;
  selectedDocument: Document;

  constructor(private firebase: AngularFireDatabase) {
    this.selectedDocument = new Document();
  }

  getDocuments() {
    return (this.documentList = this.firebase.list('documents'));
  }

  getDocumentsBySubject() {}

  getDocumentsByStudent() {}

  getDocumentsBySubjectAndStudent() {}

  insertDocument(subjectkey: string, userKey: string, document: Document) {
    let newDocumentKey = this.firebase.database
      .ref()
      .child(`documents/${subjectkey}/${userKey}`)
      .push().key;
    let update = {};
    update[
      'documents/' + subjectkey + '/' + userKey + '/' + newDocumentKey
    ] = document;
    this.firebase.database
      .ref()
      .update(update);
  }

  updateDocument(document: Document) {
    this.documentList.update(document.$key, {
      documentName: document.documentName,
      userNameerName: document.userName,
      subjectName: document.subjectName,
    });
  }

  deleteDocument($key: string) {
    this.documentList.remove($key);
  }
}
