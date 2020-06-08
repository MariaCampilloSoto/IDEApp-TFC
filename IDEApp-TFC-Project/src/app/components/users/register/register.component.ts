import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User, Role } from 'src/app/models/user';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userService: UserService;
  courseService: CourseService;
  course: Course;
  private role: Role;

  constructor(private authService: AuthService, userService: UserService, courseService: CourseService) {
    this.userService = userService;
    this.courseService = courseService;
    this.role = new Role();
    this.course = new Course();
  }

  ngOnInit(): void {
    this.userService.getAllUsers();
    this.courseService.getCourses();
    this.resetForm();
  }

  onSubmit(registerForm: NgForm) {
    // this.authService
    //   .registerUser(this.userService.selectedUser.email, this.userService.selectedUser.password)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    this.course.setFullInfo();
    registerForm.value.role = this.role;
    console.log('value form: ', registerForm.value)
    if(registerForm.value.$key == null){
      this.userService.insertUser(registerForm.value);
      this.courseService.insertCourse(this.course);

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
  
  isTutor(event){
    let isChecked = event.target.checked;
    if(isChecked){
      document.getElementById('teacherTutorForm').style.display = 'block';
    } else {
      document.getElementById('teacherTutorForm').style.display = 'none';
    } 
  }

  resetForm(registerForm?: NgForm){
    if(registerForm != null) registerForm.reset();
    this.userService.selectedUser = new User();
    this.resetRole();
  }
  
  resetRole(){
    this.role = new Role();
    this.course = new Course()
  }
}
