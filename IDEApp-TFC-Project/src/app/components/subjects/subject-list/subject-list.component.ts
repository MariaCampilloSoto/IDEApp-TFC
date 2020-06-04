import { Component, OnInit } from '@angular/core';

//Service
import{ SubjectService} from 'src/app/services/subject.service'
//Subject
import { Subject } from 'src/app/models/subject';

//Toastr
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  
  subjectList: Subject[];
  subjectService: SubjectService;

  private toastr: ToastrService;

  constructor( subjectService: SubjectService, toastr: ToastrService) {
   this.subjectService= subjectService;
   this.toastr = toastr;
   }

  ngOnInit(){

    this.subjectService.getSubjects().snapshotChanges()
    .subscribe(item => { 
      this.subjectList =[];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.subjectList.push(x as Subject);
      })
    }); 
  }
  
    onEdit(subjet:Subject){
      //assign para no crear un doble enlace de datos
      this.subjectService.selectedSubject = Object.assign({},subjet);
      //se crea una copia del producto
    }

    onDelete($key: string){
      if(confirm('¿Seguro que desea eliminar la asignatura?')){
      this.subjectService.deleteSubject($key);
      //no sale el toastr, me odia
      this.toastr.success('Successfull Operation','Asignatura borrada con exito');
      }

    }

}
