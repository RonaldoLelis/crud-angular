import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private serviceCourse: CoursesService,
  ) {
    this.form = this.fb.group({
      _id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      category: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      console.log('params: ', params);
      if(Object.entries(params).length > 0) {
        this.form.setValue({
          _id: params['_id'],
          name: params['name'],
          category: params['category']
        });
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
    });
  }

  onSubmit() {
    this.serviceCourse.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError()
    });
  }

  onCancel() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  onSuccess() {
    this._snackBar.open('Sucesso ao salvar o curso.', 'fechar', { duration: 3000 });
    this.onCancel();
  }

  onError() {
    this._snackBar.open('Erro ao salvar o curso.', 'fechar', { duration: 3000 });
  }

  getErrorMessage(field: string) {
    const fieldName = this.form.get(field);
    if(fieldName?.hasError('required')) return 'Campo obrigatório';
    if(fieldName?.hasError('minlength')) {
      const requiredLength = fieldName.errors ? fieldName.errors['minlength']['requiredLength'] : 3;
      return `Campo deve ter no mínimo ${requiredLength} caracteres`;
    }
    return '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  get name() {
    return this.form.get('name');
  }

  get category() {
    return this.form.get('category');
  }

}
