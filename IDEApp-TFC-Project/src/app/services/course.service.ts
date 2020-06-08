import { Injectable } from '@angular/core';
import {
  AngularFireList,
  AngularFireDatabase,
  snapshotChanges,
} from '@angular/fire/database';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courseList: AngularFireList<any>;

  selectedCourse: Course;

  constructor(private firebase: AngularFireDatabase) {
    this.selectedCourse = new Course();
  }

  getCourses() {
    return (this.courseList = this.firebase.list('courses'));
  }

  insertCourse(course: Course) {
    let isCourse = false;

    // filtrado, busca si esta en la base de datos toda la info junta
    this.firebase.database
      .ref('courses')
      .orderByChild('fullInfo')
      .equalTo(course.fullInfo)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          isCourse = true;
        }
      });

    console.log('condicion: ', isCourse);
    if (!isCourse) {
      this.courseList.push({
        course: course.course,
        level: course.level,
        year: course.year,
        fullInfo: course.fullInfo,
      });
    }
  }

  updateCourse(course: Course) {
    this.courseList.update(course.$key, {
      course: course.course,
      level: course.level,
      year: course.year,
    });
  }

  deleteCourse($key: string) {
    this.courseList.remove($key);
  }

  async isCourse(courseFullInfo: string) {
    let isCourse = false;
    this.courseList.snapshotChanges().subscribe((item) => {
      item.forEach((element) => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        console.log('x: ', x);
        if ((x as Course)['fullInfo'] === courseFullInfo) {
          console.log('estoy dentro');
          isCourse = true;
        }
      });
    });
    console.log('resultado: ', isCourse);
    return isCourse;
  }
}
