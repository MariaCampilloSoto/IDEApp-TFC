import { Component, OnInit } from '@angular/core';

//Service
import { SubjectService } from 'src/app/services/subject.service';
import { AuthService } from 'src/app/services/auth.service';

//Subject
import { Subject } from 'src/app/models/subject';

//Toastr
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';

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

  courseFullInfo: string = '';
  courseList: Course[];
  courseService: CourseService;

  constructor(
    subjectService: SubjectService,
    courseService: CourseService,
    toastr: ToastrService,
    private authService: AuthService
  ) {
    this.subjectService = subjectService;
    this.courseService = courseService;
    this.toastr = toastr;
    this.courseList = [];
  }

  // Método llamado cuando se inicia el componente
  ngOnInit() {
    // Llama al metodo para obtener el role del usuario
    this.getCurrentUser();

    this.courseService
      .getCourses()
      .snapshotChanges()
      .subscribe((item) => {
        this.courseList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.courseList.push(x as Course);
        });
      });

    this.getListadoAsignaturas();
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
      this.toastr.success(
        'Eliminación completada',
        'Has eliminado la asignatura.'
      );
    }
  }

  // Obtener la lista de asignaturas
  getListadoAsignaturas() {
    this.subjectService
      .getSubjects()
      .snapshotChanges()
      .subscribe((item) => {
        this.subjectList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          if (
            this.courseFullInfo === (x as Subject).schoolYear ||
            this.courseFullInfo === ''
          ) {
            this.subjectList.push(x as Subject);
          }
        });
      });
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
                if ((user as User).hasOwnProperty('course')) {
                  this.courseFullInfo = (user as User).course;
                }
              }
            });
          });
      } else {
      }
    });
  }
}
