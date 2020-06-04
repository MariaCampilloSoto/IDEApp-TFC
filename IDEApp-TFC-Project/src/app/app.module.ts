//firebase
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
//bbdd
import { AngularFireDatabaseModule } from '@angular/fire/database';
//storage
import { AngularFireStorageModule } from '@angular/fire/storage';

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
import { HomeComponent } from './home/home.component';

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
  ],
  providers: [
    SubjectService,
    DepartmentService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
