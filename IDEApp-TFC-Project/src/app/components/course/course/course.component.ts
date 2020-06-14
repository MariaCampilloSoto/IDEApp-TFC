import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  courseService: CourseService;

  constructor(courseService: CourseService, private toastr: ToastrService) {
    this.courseService = courseService;
  }

  ngOnInit(): void {
    this.courseService.getCourses();
    this.resetForm();
  }

  onSubmit(courseForm: NgForm) {
    courseForm.value.fullInfo = this.getFullInfo(courseForm.value);
    console.log('courseForm.value: ', courseForm.value)
    if (courseForm.value.$key == null) {
      this.courseService.insertCourse(courseForm.value);
    } else {
      this.courseService.updateCourse(courseForm.value);
    }

    this.resetForm(courseForm);
    this.toastr.success('Successfull Operation');
  }

  resetForm(courseForm?: NgForm) {
    if (courseForm != null) courseForm.reset();
    this.courseService.selectedCourse = new Course();
  }

  getFullInfo(obj: any) {
    return `${obj.course} ${obj.level}`;
  }
}
