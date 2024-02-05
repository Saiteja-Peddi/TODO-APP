import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditDialogData, Task } from '../task';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  editTaskForm: FormGroup = this.fb.group({
    task: [
      this.data.taskData.value,
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.taskData) {
      this.editTaskForm.patchValue({
        task: this.data.taskData.value,
      });
    }
  }

  fc(name: string) {
    return this.editTaskForm.controls[name];
  }
  cancelEdit() {
    // Close logic will go here
    console.log(this.fc('task').value);
    this.dialogRef.close({
      changed: false,
      value: this.fc('task').value,
    });
  }

  editTask() {
    console.log(this.fc('task').value);
    this.dialogRef.close({
      changed: true,
      value: this.fc('task').value,
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.editTaskForm.get(controlName);
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
