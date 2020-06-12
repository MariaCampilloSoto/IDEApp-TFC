import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  providerid: string = 'null';

  isAdmin: any = false;
  isTeacher: any = false;
  isEditor: any = false;

  isSurname2: any = false;
  isContact2: any = false;

  constructor(private authService: AuthService) {
    this.user = {};
   }

  ngOnInit(): void {
    this.getCurrentUser();
    // this.authService.isAuth().subscribe(user =>{
    //   if(user){
    //     this.user.name = user.displayName;
    //     this.user.email = user.email;
    //     this.providerid = user.providerData[0].providerId;
    //     console.log('user: ', user);
    //   }
    // })
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
                this.user = Object.assign({}, (user as User));
                this.isSurname2 = this.user.surname2 === '' ? false : true;
                this.isContact2 = this.user.hasOwnProperty('contact2') ? true : false;
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

