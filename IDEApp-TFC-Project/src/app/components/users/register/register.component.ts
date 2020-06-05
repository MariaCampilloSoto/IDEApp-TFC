import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Department } from 'src/app/models/department';
import { Role } from 'src/app/models/user';
import { ContactInterface } from 'src/app/models/contacto';
import { Contacto } from 'src/app/models/contactoClass';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  name: string = '';
  surname1: string = '';
  surname2: string = '';
  // strudent info
  contactInformation: ContactInterface[];
  contact1: Contacto;
  contact2: Contacto;
  // teacher info
  dni: string = '';
  phone: string = '';
  address: string = '';
  department: Department = null;
  active: boolean = true;
  role: Role = null;

  constructor(private router: Router, private authService: AuthService) {
    this.contact1 = new Contacto();
    this.contact2 = new Contacto();
    this.department = new Department();
  }

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

  showContent(event){
    console.log(event.target.defaultValue)
    let value = event.target.defaultValue;
    if(value === 'student'){
      document.getElementById('studentForm').style.display = 'block';
      document.getElementById('teacherForm').style.display = 'none';
    } else if (value === 'teacher') {
      document.getElementById('studentForm').style.display = 'none';
      document.getElementById('teacherForm').style.display = 'block';
      
    } else {
      document.getElementById('studentForm').style.display = 'none';
      document.getElementById('teacherForm').style.display = 'none';
    }
  }
}
