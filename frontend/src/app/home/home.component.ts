import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
