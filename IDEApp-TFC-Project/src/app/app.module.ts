import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DocumentsComponent } from './documents/documents.component';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { GroupComponent } from './group/group.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { YearsComponent } from './years/years.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    SubjectsComponent,
    DepartmentsComponent,
    DocumentsComponent,
    PersonalAreaComponent,
    GroupComponent,
    ContactInformationComponent,
    YearsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
