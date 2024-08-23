import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs/operators';

import { CourseModel } from './../models/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly apiURL: string = 'api/courses';

  constructor(private httpClient: HttpClient ) { }

  getCourses() {
    return this.httpClient.get<CourseModel[]>(this.apiURL).pipe(
      first(),
      delay(1000),
    );
    // return this.httpClient.get<CourseModel[]>(this.apiURL).pipe(first());
  }

  loadById(id: number) {
    return this.httpClient.get<CourseModel>(`${this.apiURL}/${id}`);
  }

  save(course: CourseModel) {
    if(course._id) return this.update(course);
    else return this.create(course);
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.apiURL}/${id}`).pipe(first());
  }

  private create(course: Partial<CourseModel>) {
    return this.httpClient.post<CourseModel>(this.apiURL, course).pipe(first());
  }

  private update(course: Partial<CourseModel>) {
    return this.httpClient.put<CourseModel>(`${this.apiURL}/${course._id}`, course).pipe(first());
  }


}
