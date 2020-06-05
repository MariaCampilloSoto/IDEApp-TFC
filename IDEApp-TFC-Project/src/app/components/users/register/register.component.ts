import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onAddUser() {
    this.authService
      .registerUser(this.email, this.password)
      .then((res) => {
        // this.authService.isAuth().subscribe(user => {
        //   if(user) {
        //     user.updateProfile({
        //       displayName: ''
        //     }).then(()=> console.log('user update'))
        //     .catch(err => console.log(err))
        //   }
        // })
        this.router.navigate(['']);
      })
      .catch((err) => console.log(err));
  }
}
