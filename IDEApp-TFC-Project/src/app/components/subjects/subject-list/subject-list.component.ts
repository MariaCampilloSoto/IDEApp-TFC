import { Component, OnInit } from '@angular/core';

//Service
import { SubjectService } from 'src/app/services/subject.service';
import { AuthService } from 'src/app/services/auth.service';

//Subject
import { Subject } from 'src/app/models/subject';

//Toastr
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit {
  subjectList: Subject[];
  subjectService: SubjectService; // Declaracion del servicio

  private toastr: ToastrService;

  isAdmin: any = false;
  isTeacher: any = false;
  isEditor: any = false;
  teacherFullName: string = '';

  constructor(
    subjectService: SubjectService,
    toastr: ToastrService,
    private authService: AuthService
  ) {
    this.subjectService = subjectService;
    this.toastr = toastr;
  }

  // Método llamado cuando se inicia el componente
  ngOnInit() {
    // Llama al metodo para obtener el role del usuario
    this.getCurrentUser();
    // Obtener la lista de asignaturas
    this.subjectService
      .getSubjects()
      .snapshotChanges()
      .subscribe((item) => {
        this.subjectList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          // Añadirlas al array, interpolacion -> Data binding con HTML
          this.subjectList.push(x as Subject);
        });
      });
  }

  // Editar una asignatura dada
  onEdit(subjet: Subject) {
    //assign para no crear un doble enlace de datos
    this.subjectService.selectedSubject = Object.assign({}, subjet);
    //se crea una copia del producto
  }

  // Eliminar una asignatura en concreo
  onDelete($key: string) {
    if (confirm('¿Seguro que desea eliminar la asignatura?')) {
      this.subjectService.deleteSubject($key);
      this.toastr.success('Eliminación completada', 'Has eliminado la asignatura.');
    }
  }

  // Obtener el usuario actual y comprobar su role
  getCurrentUser() {
    this.authService.isAuth().subscribe((auth) => {
      if (auth) {
        this.authService
          .getUsers()
          .snapshotChanges()
          .subscribe((item) => {
            item.forEach((element) => {
              let user = element.payload.toJSON();
              user['$key'] = element.key;
              if ((user as User).email === auth.email) {
                let role = Object.assign({}, (user as User).role);
                this.isAdmin = role.hasOwnProperty('admin');
                this.isEditor = role.hasOwnProperty('editor');
                this.isTeacher = role.hasOwnProperty('teacher');
                if (this.isTeacher) {
                  this.teacherFullName = `${(user as User).name} ${
                    (user as User).surname1
                  } ${(user as User).surname2}`;
                }
              }
            });
          });
      } else {
        console.log('NOT user logged --> problem');
      }
    });
  }
}
