import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { DepartmentsComponent } from './departments/departments.component';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { YearsComponent } from './years/years.component';
import { GroupComponent } from './group/group.component';
import { DocumentsComponent } from './documents/documents.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'subjects', component: SubjectsComponent},
  {path: 'departments', component: DepartmentsComponent},
  {path: 'personal-area', component: PersonalAreaComponent},
  {path: 'contact-information', component: ContactInformationComponent},
  {path: 'another-years', component: YearsComponent},
  {path: 'group', component: GroupComponent},
  {path: 'documents', component: DocumentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
