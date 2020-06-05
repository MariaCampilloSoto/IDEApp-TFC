import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/storage'

//Service
import{ DocumentService } from '../../../services/document.service';

//Subject Class
import{ Document } from '../../../models/document';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  
 documentService: DocumentService;

 uploadPercent: Observable<number>;
 urlFile: Observable<string>;

  constructor( documentService : DocumentService, private storage: AngularFireStorage ) {
    this.documentService = documentService;
   }

  ngOnInit(): void {
    this.documentService.getDocuments();
    this.resetForm();
  }
  onSubmit (documentForm: NgForm){
    if(documentForm.value.$key == null)
    this.documentService.insertDocument(documentForm.value);
    else
    this.documentService.updateDocument(documentForm.value);
    
    this.resetForm(documentForm);
  }
  resetForm(subjectForm?:NgForm){
    if(subjectForm != null) subjectForm.reset();
    this.documentService.selectedDocument=new Document();
  }

  onUpload(e, documentForm: NgForm){
    //console.log('subir',e);
    const file = e.target.files[0];
    const filePath = `uploads/${documentForm.value.documentName}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file)
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges()
    .pipe( 
      finalize (() => this.urlFile = ref.getDownloadURL())
      ).subscribe();

  }

}
