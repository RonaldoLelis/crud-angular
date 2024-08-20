import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseModel } from '../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: CourseModel[] = [];
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  readonly displayedColumns = ['name', 'category', 'actions'];

  onEdit(course: CourseModel) {
    this.edit.emit(course);
  }

  onDelete(course: CourseModel) {
    this.delete.emit(course);
  }

}
