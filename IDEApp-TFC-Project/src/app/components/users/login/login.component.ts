import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(public auth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  onLogin(){
    this.authService.loginRegisterUser(this.email, this.password);
    this.router.navigate(['/'])
  }

  onLogout(){
    this.authService.logoutUser();
  }

}
