import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private auth: AngularFireAuth) { }
  public isLogged: boolean = false;
  public isAdmin: any = false;
  public isTeacher: any = false;
  public isEditor: any = false;
  public userUid: string = null;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.userUid = auth.uid;
        // console.log('auth: ', auth)
        // console.log('userUid: ', this.userUid)
        // this.authService.isUserRole(this.userUid).subscribe(userRole => {
        //   console.log(userRole)
        //   console.log(userRole.role)
        //   let role = Object.assign({}, userRole.role);
        //   this.isAdmin = role.hasOwnProperty('admin');
        //   this.isEditor = role.hasOwnProperty('editor');
        //   this.isTeacher = role.hasOwnProperty('teacher');
        // })
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.auth.signOut();
  }


}