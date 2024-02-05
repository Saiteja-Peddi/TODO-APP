import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup = this.fb.group({
    task: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  getErrorMessage(controlName: string): string | null {
    const control = this.todoForm.get(controlName);
    if (control?.errors?.['required']) {
      return 'This field is required.';
    } else if (control?.errors?.['minlength']) {
      return `Min length: ${control.errors['minlength'].requiredLength} characters long.`;
    } else if (control?.errors?.['maxlength']) {
      return `Max length: ${control.errors['maxlength'].requiredLength} characters long.`;
    }
    return null;
  }
}
