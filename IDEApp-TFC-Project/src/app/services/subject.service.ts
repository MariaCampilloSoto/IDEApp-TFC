import { Injectable } from '@angular/core';

//mis imports
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule} from '@angular/fire/database';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  //lista de asignaturas
  subjectList: AngularFireList<any>;
  //almacena temporalmente el dato seleccionado 
  //Al iniciar el servicio esta en blanco
  selectSubject:Subject = new Subject(); 

  constructor(private firebase:AngularFireDatabase) { }

  //obtiene el listado de asignaturas
  getSubject(){
    //obtengo de firebase la lista con todas las asignaturas
    this.subjectList = this.firebase.list('subjects');
  }
  //crea una nueva asignatura
  insertSubject(subject: Subject){
    this.subjectList.push({
      idSubject: subject.$IdSubject,
      idSchoolYear: subject.$IdSchoolYear,
      idTeacher:subject.$IdTeacher,
      name: subject.$name
      
    });
  }
  //actualiza/modifica una asignatura
  updateSubject(subject: Subject){
    this.subjectList.update(subject.$IdSubject,{
       idSubject: subject.$IdSubject,
      idSchoolYear: subject.$IdSchoolYear,
      idTeacher:subject.$IdTeacher,
      name: subject.$name
    })

  }

  //borra una asignatura
  deleteSubject($IdSubject:string){
    this.subjectList.remove($IdSubject);
  }


}
