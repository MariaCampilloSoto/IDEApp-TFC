import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { SubjectsComponentMain } from './components/subjects/subjectsmain.component'


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact-information', component: ContactInformationComponent},
  {path: 'subjects', component: SubjectsComponentMain}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
