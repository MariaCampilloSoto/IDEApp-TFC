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
import { CourseComponent } from './components/course/course/course.component';
import { EvaluationComponent } from './components/course/evaluation/evaluation.component';
import { AuthGuard } from './guards/auth.guard'
import { UserListComponent } from './components/users/user-list/user-list.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'subjects', component: SubjectsComponentMain, canActivate: [AuthGuard]},
  {path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard]}, // User profesores
  {path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard]},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent, canActivate: [AuthGuard]}, // Usuarios admin
  {path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user/list', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'course/register', component: CourseComponent, canActivate: [AuthGuard]},
  {path: 'evaluation', component: EvaluationComponent, canActivate: [AuthGuard]},
  {path: '**', component: Page404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
