import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { SubjectsComponentMain } from './components/subjects/subjectsmain.component'
import { DepartmentsComponent } from './components/departments/departments.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact-information', component: ContactInformationComponent},
  {path: 'subjects', component: SubjectsComponentMain},
  {path: 'departments', component: DepartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
