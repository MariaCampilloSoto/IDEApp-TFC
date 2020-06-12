//firebase
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
//bbdd
import { AngularFireDatabaseModule } from '@angular/fire/database';
//storage
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
//animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule } from '@angular/forms';

//Components
import { HomeComponent } from './components/home/home.component';

//import asignaturas
import { SubjectsComponentMain } from './components/subjects/subjectsmain.component';
import { SubjectListComponent } from './components/subjects/subject-list/subject-list.component';
import { SubjectComponent } from './components/subjects/subject/subject.component';

// import department components
import { DepartmentsComponent } from './components/departments/departments.component';
import { DepartmentListComponent } from './components/departments/department-list/department-list.component';
import { DepartmentComponent } from './components/departments/department/department.component';

//Services
import { SubjectService } from './services/subject.service';
import { DepartmentService } from './services/department.service';

//Toastr
import { ToastrModule } from 'ngx-toastr';
//
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
//
import { Page404Component } from './components/page404/page404.component';
//
import { NavbarComponent } from './components/navbar/navbar.component';
//
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentComponent } from './components/documents/document/document.component';
import { DocumentListComponent } from './components/documents/document-list/document-list.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { CourseComponent } from './components/course/course/course.component';
import { EvaluationComponent } from './components/course/evaluation/evaluation.component';

//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubjectsComponentMain,
    SubjectListComponent,
    SubjectComponent,
    DepartmentsComponent,
    DepartmentListComponent,
    DepartmentComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    NavbarComponent,
    DocumentsComponent,
    DocumentComponent,
    DocumentListComponent,
    CourseListComponent,
    CourseComponent,
    EvaluationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    CommonModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgbModule,
  ],
  providers: [
    SubjectService,
    DepartmentService,
    AngularFireAuth,
    AngularFirestore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
