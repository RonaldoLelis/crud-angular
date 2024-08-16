import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs/operators';

import { CourseModel } from './../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly apiURL: string = 'api/courses';
  private readonly api = '/assets/courses.json';

  constructor(private httpClient: HttpClient ) { }

  getCourses() {
    return this.httpClient.get<CourseModel[]>(this.api).pipe(
      first(),
      delay(3000),
    );
    // return this.httpClient.get<CourseModel[]>(this.apiURL).pipe(first());
  }

  loadById(id: string) {
    return this.httpClient.get<CourseModel>(`${this.apiURL}/${id}`);
  }

  save(course: CourseModel) {
    if(course._id) return this.update(course);
    else return this.create(course);
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.apiURL}/${id}`).pipe(first());
  }

  private create(course: CourseModel) {
    return this.httpClient.post<CourseModel>(this.apiURL, course).pipe(first());
  }

  private update(course: CourseModel) {
    return this.httpClient.put<CourseModel>(`${this.apiURL}/${course._id}`, course).pipe(first());
  }


}
