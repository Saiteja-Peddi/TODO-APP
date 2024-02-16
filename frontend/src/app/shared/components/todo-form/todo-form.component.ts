import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NewTask } from '../../interface';
import { TasksHttpService } from '../../services/tasks-http.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupMsgComponent } from '../popup-msg/popup-msg.component';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  @Output() reloadTasks = new EventEmitter<boolean>();

  todoForm: FormGroup = this.fb.group({
    task: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private taskHttp: TasksHttpService,
    private dialog: MatDialog
  ) {}

  addTask() {
    if (this.todoForm.valid) {
      let newTask: NewTask = {
        value: this.fc('task').value,
        completed: false,
        deleted: false,
      };
      this.taskHttp.addTask(newTask).subscribe({
        next: (data) => {
          if (data.ok && data.body) {
            this.reloadTasks.emit(true);
            this.todoForm.reset('');
          }
        },
        error: (error) => {
          this.showErrorDialog(error.message);
        },
      });
    } else {
      // Optionally, mark all controls as touched to show validation errors
      // In this case there is only one field
      this.todoForm.markAllAsTouched();
    }
  }

  fc(name: string) {
    return this.todoForm.controls[name];
  }

  refreshDB() {
    // Make a http request to permanently remove the deleted tasks.
    this.taskHttp.cleanDB().subscribe({
      next: (data) => {
        if (data.ok && data.body) {
          console.log(data.body.message);
        }
      },
      error: (error) => {
        this.showErrorDialog(error.message);
      },
    });
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(PopupMsgComponent, {
      panelClass: 'popup-dialog-container',
      data: errorMessage,
    });
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
