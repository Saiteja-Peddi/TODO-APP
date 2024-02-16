import { Component, OnInit } from '@angular/core';
import { Task } from '../../interface';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TasksHttpService } from '../../services/tasks-http.service';
import { PopupMsgComponent } from '../popup-msg/popup-msg.component';
import { error } from 'console';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoList: Task[] = [];

  constructor(private dialog: MatDialog, private taskHttp: TasksHttpService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskHttp.getAllTasks().subscribe({
      next: (data) => {
        if (data.ok && data.body) {
          this.todoList = data.body.tasks;
        }
      },
      error: (error) => {
        this.showErrorDialog(error.message);
      },
    });
  }

  checkBoxClicked(index: number) {
    // this.todoList[index].completed = !this.todoList[index].completed;
    let task = { ...this.todoList[index] };
    task.completed = !task.completed;
    this.updateTask(task);
  }

  deleteTask(task: Task) {
    this.taskHttp.deleteTask(task).subscribe({
      next: (data) => {
        if (data.ok) {
          this.getAllTasks();
        }
      },
      error: (error) => {
        this.showErrorDialog(error.message);
      },
    });
  }

  editTask(task: Task) {
    console.log(task);
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: {
        taskData: task,
      },
      panelClass: 'dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.changed) {
        this.updateTask(result.task);
      }
    });
  }

  updateTask(task: Task) {
    this.taskHttp.updateTask(task).subscribe({
      next: (data) => {
        if (data.ok && data.body) {
          this.getAllTasks();
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

  trackByItems(index: number, task: Task): string {
    return task._id;
  }
}
