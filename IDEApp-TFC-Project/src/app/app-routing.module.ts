import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponentMain } from './components/subjects/subjectsmain.component'
import { DepartmentsComponent } from './components/departments/departments.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { DocumentsComponent } from './components/documents/documents.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'subjects', component: SubjectsComponentMain},
  {path: 'departments', component: DepartmentsComponent}, // User profesores
  {path: 'documents', component: DocumentsComponent},
  //{path: 'book/:id', component: deteilsbookComponent } anotacion para mas adelante porque puede ser util
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent}, // Usuarios admin
  {path: 'user/profile', component: ProfileComponent},
  {path: '**', component: Page404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
