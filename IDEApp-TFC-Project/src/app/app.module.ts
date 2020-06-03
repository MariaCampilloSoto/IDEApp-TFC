
//firebase
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
//bbdd
import { AngularFireDatabaseModule } from '@angular/fire/database';
//storage
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import {FormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {ReactiveFormsModule} from '@angular/forms'

//Components
import { HomeComponent } from './home/home.component';

//import asignaturas
import { SubjectsComponentMain } from './components/subjects/subjectsmain.component';
import { SubjectListComponent } from './components/subjects/subject-list/subject-list.component';
import { SubjectComponent } from './components/subjects/subject/subject.component';

//Services
import { SubjectService } from './services/subject.service'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubjectsComponentMain,
    SubjectListComponent,
    SubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
   
  ],
  providers: [
    SubjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
