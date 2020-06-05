import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
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
  
  insertDocument(document: Document) {
    this.documentList.push({
      documentName: document.documentName,
      userNameerName: document.userName,
      subjectName: document.subjectName,
    });
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
