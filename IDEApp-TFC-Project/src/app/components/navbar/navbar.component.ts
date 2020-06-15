import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  isLogged: boolean = false;
  isAdmin: any = false;
  isTeacher: any = false;
  isEditor: any = false;
  
  constructor(
    private authService: AuthService,
    private auth: AngularFireAuth,
    private router: Router
  ) {}
  
  ngOnInit() {
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
              }
            });
          });

        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }
}
