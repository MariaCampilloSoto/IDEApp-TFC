import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Document } from '../models/document';
import { UserService } from './user.service';
import { SubjectService } from './subject.service';
import { Subject } from '../models/subject';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
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
    this.storage.ref(`${document.url}/${document.$key}`).delete()
  }





 // getDocuments() {
  //   let subjectList: Subject[] = [];
  //   let userList: User[] = [];
  //   let documentList: Document[] = [];

  //   this.subjectService
  //     .getSubjects()
  //     .snapshotChanges()
  //     .subscribe((item) => {
  //       item.forEach((element) => {
  //         let x = element.payload.toJSON();
  //         x['$key'] = element.key;
  //         subjectList.push(x as Subject);
  //       });
  //     });

  //   this.userService
  //     .getAllUsers()
  //     .snapshotChanges()
  //     .subscribe((item) => {
  //       item.forEach((element) => {
  //         let x = element.payload.toJSON();
  //         x['$key'] = element.key;
  //         userList.push(x as User);
  //       });
  //     });

  //   for (let subject of subjectList) {
  //     for (let user of userList) {
  //       this.firebase
  //         .list(`documents/${subject.$key}/${user.$key}`)
  //         .snapshotChanges()
  //         .subscribe((item) => {
  //           item.forEach((element) => {
  //             let x = element.payload.toJSON();
  //             x['$key'] = element.key;
  //             documentList.push(x as Document);
  //           });
  //         });
  //     }
  //   }

  //   this.firestore
  //     .collection(subjectList[0].$key)
  //     .doc()
  //     .ref.get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log('docdata: ', doc.data());
  //       } else {
  //         console.log('hey, estoy en un mal sitio');
  //       }
  //     });

  //   return documentList;
  // }





 // getDocumentsBySubject(subjectKey: string) {
    // let userList: User[] = [];
    // let documentList: Document[] = [];

    // this.userService
    //   .getAllUsers()
    //   .snapshotChanges()
    //   .subscribe((item) => {
    //     item.forEach((element) => {
    //       let x = element.payload.toJSON();
    //       x['$key'] = element.key;
    //       userList.push(x as User);
    //     });
    //   });

    // for (let user of userList) {
    //   this.firebase
    //     .list(`documents/${subjectKey}/${user.$key}`)
    //     .snapshotChanges()
    //     .subscribe((item) => {
    //       item.forEach((element) => {
    //         let x = element.payload.toJSON();
    //         x['$key'] = element.key;
    //         documentList.push(x as Document);
    //       });
    //     });
    // }

    // return documentList;
   // return this.firebase.list(`documents/${subjectKey}`);
  //}


  // getDocumentsByUser(userKey: string) {
  //   let subjectList: Subject[] = [];
  //   let documentList: Document[] = [];

  //   this.subjectService
  //     .getSubjects()
  //     .snapshotChanges()
  //     .subscribe((item) => {
  //       item.forEach((element) => {
  //         let x = element.payload.toJSON();
  //         x['$key'] = element.key;
  //         subjectList.push(x as Subject);
  //       });
  //     });

  //   for (let subject of subjectList) {
  //     this.firebase
  //       .list(`documents/${subject.$key}/${userKey}`)
  //       .snapshotChanges()
  //       .subscribe((item) => {
  //         item.forEach((element) => {
  //           let x = element.payload.toJSON();
  //           x['$key'] = element.key;
  //           documentList.push(x as Document);
  //         });
  //       });
  //   }

  //   return documentList;
  // }


  
 // getDocumentsBySubjectAndUser(subjectkey: string, userKey: string) {
    //let documentList: Document[] = [];
    //return this.firebase.list(`documents/${subjectkey}/${userKey}`);
    // .snapshotChanges()
    // .subscribe((item) => {
    //   item.forEach((element) => {
    //     let x = element.payload.toJSON();
    //     x['$key'] = element.key;
    //     documentList.push(x as Document);
    //   });
    // });

    //return documentList;
 // }
}
