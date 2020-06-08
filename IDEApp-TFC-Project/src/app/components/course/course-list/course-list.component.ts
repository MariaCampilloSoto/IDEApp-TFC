import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courseList: Course[];
  courseService: CourseService;

  private toastr: ToastrService;

  constructor(courseService: CourseService, toastr: ToastrService) {
    this.courseService = courseService;
    this.toastr = toastr;
  }

  ngOnInit(): void {
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
  }

  onEdit(course: Course){
    this.courseService.selectedCourse = Object.assign({}, course);
  }

  onDelete($key){
    if (confirm('Are you sure you want to delete it?')) {
      this.courseService.deleteCourse($key);
      this.toastr.success('succesfull Operation', 'Curso eliminado');
    }
  }
}
