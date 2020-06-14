import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User, Role } from 'src/app/models/user';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from '../../../models/subject';
import { DepartmentListComponent } from '../../departments/department-list/department-list.component';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userService: UserService;
  courseService: CourseService;
  subjectService: SubjectService;
  departmentService: DepartmentService;

  courseList: Course[];
  subjectList: Subject[];
  subjectSignUpList: string[];
  departmentList: Department[];

  departmentName: string;
  courseFullInfo: string;
  // courseSubjectTeacherGives: string;
  private role: Role;

  constructor(
    userService: UserService,
    courseService: CourseService,
    departmentService: DepartmentService,
    subjectService: SubjectService
  ) {
    this.userService = userService;
    this.courseService = courseService;
    this.subjectService = subjectService;
    this.departmentService = departmentService;
    this.role = new Role();
    this.subjectSignUpList = [];
    this.courseList = [];
    this.departmentList = [];
  }

  ngOnInit(): void {
    this.userService.getAllUsers();
    
    this.resetForm();

    this.courseService
      .getCourses()
      .snapshotChanges()
      .subscribe((item) => {
        this.courseList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.courseList.push(x as Course);
        });
      });

      this.departmentService.getDepartments()
      .snapshotChanges()
      .subscribe((item) => {
        this.departmentList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.departmentList.push(x as Department);
        });
      });

    this.getListadoAsignaturas()
  }

  onSubmit(registerForm: NgForm) {
    registerForm.value.role = this.role;
    registerForm.value.course = this.courseFullInfo;
    registerForm.value.department.departmentName = this.departmentName;
    
    if (registerForm.value.$key == null) {
      this.userService.insertUserInSubjects(
        registerForm.value,
        this.subjectSignUpList
      );
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
        alert('Vas a crear un nuevo administrador');
        this.role.admin = true;
      } else {
        alert('Vas a crear un nuevo editor');
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
    let isChecked = event.target.checked;
    let id = event.target.id;
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

  getListadoAsignaturas(){
    this.subjectService
    .getSubjects()
    .snapshotChanges()
    .subscribe((item) => {
      this.subjectList = [];
      item.forEach((element) => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        if (this.courseFullInfo === (x as Subject).schoolYear) {
          this.subjectList.push(x as Subject);
        }
      });
    });
  }

  resetForm(registerForm?: NgForm) {
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
  }
}
