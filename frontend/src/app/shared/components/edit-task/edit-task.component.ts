import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditDialogData } from '../../interface';
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
  initialValue: string;
  isChanged = false;

  editTaskForm: FormGroup = this.fb.group({
    value: [
      this.data.taskData.value,
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData
  ) {
    this.initialValue = this.data.taskData.value;
  }

  ngOnInit(): void {
    this.editTaskForm.valueChanges.subscribe(() => {
      // Check if the current form value is different from the initial value
      this.isChanged = this.fc('value').value !== this.initialValue;
    });
  }

  fc(name: string) {
    return this.editTaskForm.controls[name];
  }
  cancelEdit() {
    // Close logic will go here
    console.log(this.data.taskData);

    this.dialogRef.close({
      changed: false,
      task: this.data.taskData,
    });
  }

  editTask() {
    if (this.editTaskForm.valid) {
      const updatedTask: Task = {
        ...this.data.taskData, // Spread the original task data
        ...this.editTaskForm.value, // Overwrite fields with edited values
      };

      this.dialogRef.close({
        changed: true,
        task: updatedTask,
      });
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.fc(controlName);
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
