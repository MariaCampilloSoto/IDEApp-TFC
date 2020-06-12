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
  subjectService: SubjectService;

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

  ngOnInit() {
    this.getCurrentUser();
    this.subjectService
      .getSubjects()
      .snapshotChanges()
      .subscribe((item) => {
        this.subjectList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.subjectList.push(x as Subject);
        });
      });
  }

  onEdit(subjet: Subject) {
    //assign para no crear un doble enlace de datos
    this.subjectService.selectedSubject = Object.assign({}, subjet);
    //se crea una copia del producto
  }

  onDelete($key: string) {
    if (confirm('¿Seguro que desea eliminar la asignatura?')) {
      this.subjectService.deleteSubject($key);
      //no sale el toastr, me odia
      this.toastr.success(
        'Successfull Operation',
        'Asignatura borrada con exito'
      );
    }
  }

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
                console.log('role: ', role);
                console.log('isAdmin: ', this.isAdmin);
                console.log('isEditor: ', this.isEditor);
                console.log('isTeacher: ', this.isTeacher);
                console.log('teacherName: ', this.teacherFullName);
              }
            });
          });
      } else {
        console.log('NOT user logged --> problem');
      }
    });
  }
}
