import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-subjects-main',
  templateUrl: './subjectsmain.component.html',
  styleUrls: ['./subjectsmain.component.css']
})
export class SubjectsComponentMain implements OnInit {

  isAdmin: any = false;
  isTeacher: any = false;
  isEditor: any = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
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
                console.log('role: ', role);
                console.log('isAdmin: ', this.isAdmin);
                console.log('isEditor: ', this.isEditor);
                console.log('isTeacher: ', this.isTeacher);
              }
            });
          });
      } else {
        console.log('NOT user logged --> problem');
      }
    });
  }

}
