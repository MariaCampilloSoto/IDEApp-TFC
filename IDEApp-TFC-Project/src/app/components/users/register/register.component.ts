import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User, Role } from 'src/app/models/userClass';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userService: UserService;
  private role: Role;

  constructor(private authService: AuthService, userService: UserService) {
    this.userService = userService;
    this.role = new Role();
  }

  ngOnInit(): void {
    this.userService.getAllUsers();
    this.resetForm();
  }

  onSubmit(registerForm: NgForm) {
    // this.authService
    //   .registerUser(this.userService.selectedUser.email, this.userService.selectedUser.password)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    registerForm.value.role = this.role;
    console.log('value form: ', registerForm.value)
    if(registerForm.value.$key == null){
      this.userService.insertUser(registerForm.value);
    } else {
      this.userService.updateUser(registerForm.value);
    }

    this.resetForm(registerForm);
  }

  showContent(event){
    let value = event.target.defaultValue;
    this.resetRole();
    if(value === 'student'){
      document.getElementById('studentForm').style.display = 'block';
      document.getElementById('teacherForm').style.display = 'none';
    } else if (value === 'teacher') {
      document.getElementById('studentForm').style.display = 'none';
      document.getElementById('teacherForm').style.display = 'block';
      this.role.teacher = true;
    } else {
      document.getElementById('studentForm').style.display = 'none';
      document.getElementById('teacherForm').style.display = 'none';
      if(value === 'admin'){
        this.role.admin = true;
      } else {
        this.role.editor = true;
      }
    }
  }

  resetForm(registerForm?: NgForm){
    if(registerForm != null) registerForm.reset();
    this.userService.selectedUser = new User();
    this.resetRole();
  }
  
  resetRole(){
    this.role = new Role();
  }
}
