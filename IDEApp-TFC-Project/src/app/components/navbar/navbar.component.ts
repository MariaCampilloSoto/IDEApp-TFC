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
  public isAdmin: any = null;
  public isTeacher: any = null;
  public isEditor: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.userUid = auth.uid;
        this.authService.isUserRole(this.userUid).subscribe(userRole => {
          let role = Object.assign({}, userRole.role);
          this.isAdmin = role.hasOwnProperty('admin');
          this.isEditor = role.hasOwnProperty('editor');
          this.isTeacher = role.hasOwnProperty('teacher');
        })
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