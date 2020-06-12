import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User, Role } from 'src/app/models/user';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from '../../../models/subject';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userService: UserService;
  courseService: CourseService;
  subjectService: SubjectService;

  subjectList: Subject[];
  subjectSignUpList: string[];

  course: Course;
  private role: Role;

  constructor(
    userService: UserService,
    courseService: CourseService,
    subjectService: SubjectService
  ) {
    this.userService = userService;
    this.courseService = courseService;
    this.subjectService = subjectService;
    this.role = new Role();
    this.course = new Course();
    this.subjectSignUpList = [];
  }

  ngOnInit(): void {
    this.userService.getAllUsers();
    this.courseService.getCourses();
    this.subjectService.getSubjects();
    this.resetForm();

    this.subjectService
      .getSubjects()
      .snapshotChanges()
      .subscribe((item) => {
        this.subjectList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.subjectList.push(x as Subject);
        });
      });
  }

  onSubmit(registerForm: NgForm) {
    this.course.setFullInfo();
    registerForm.value.role = this.role;
    console.log('value form: ', registerForm.value);
    if (registerForm.value.$key == null) {
      this.userService.insertUserInSubjects(
        registerForm.value,
        this.subjectSignUpList
      );
      if (
        !this.role.hasOwnProperty('admin') ||
        !this.role.hasOwnProperty('editor')
      ) {
        if (typeof this.course === 'undefined') {
          this.courseService.insertCourse(this.course);}
      }
    } else {
      this.userService.updateUser(registerForm.value);
    }

    this.resetForm(registerForm);
  }

  showContent(event) {
    let value = event.target.defaultValue;
    this.resetRole();
    if (value === 'student') {
      document.getElementById('studentForm').style.display = 'block';
      document.getElementById('teacherForm').style.display = 'none';
    } else if (value === 'teacher') {
      document.getElementById('studentForm').style.display = 'none';
      document.getElementById('teacherForm').style.display = 'block';
      this.role.teacher = true;
    } else {
      document.getElementById('studentForm').style.display = 'none';
      document.getElementById('teacherForm').style.display = 'none';
      if (value === 'admin') {
        this.role.admin = true;
      } else {
        this.role.editor = true;
      }
    }
  }

  isTutor(event) {
    let isChecked = event.target.checked;
    if (isChecked) {
      document.getElementById('teacherTutorForm').style.display = 'block';
    } else {
      document.getElementById('teacherTutorForm').style.display = 'none';
    }
  }

  subjectSignUp(event) {
    console.log(event);
    let isChecked = event.target.checked;
    let id = event.target.id;
    // if (id === 'automatricula') {
    //   this.subjectList.forEach((subject) => {
    //     if (isChecked) {
    //       this.subjectSignUpList.push(subject.$key);
    //     } else {
    //       console.log('whyyyy');
    //       this.subjectSignUpList = this.subjectSignUpList.filter(
    //         (subjectId) => subjectId !== id
    //       );
    //     }
    //   });
    // } else if (id !== 'automatricula') {
    this.subjectList.forEach((subject) => {
      if (subject.$key === id) {
        if (isChecked) {
          this.subjectSignUpList.push(id);
        } else {
          this.subjectSignUpList = this.subjectSignUpList.filter(
            (subjectId) => subjectId !== id
          );
        }
      }
    });
    //}
  }

  resetForm(registerForm?: NgForm) {
    console.log(registerForm);
    if (registerForm != null) registerForm.reset();
    this.userService.selectedUser = new User();
    this.resetRole();
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      if (
        inputs[i].type.toLocaleLowerCase() === 'checkbox' ||
        inputs[i].type.toLocaleLowerCase() === 'radio'
      ) {
        inputs[i].checked = false;
      }
    }
    document.getElementById('studentForm').style.display = 'none';
    document.getElementById('teacherForm').style.display = 'none';
    document.getElementById('teacherTutorForm').style.display = 'none';
  }

  resetRole() {
    this.role = new Role();
    this.course = new Course();
  }
}
