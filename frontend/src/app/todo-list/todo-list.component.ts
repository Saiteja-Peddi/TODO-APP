import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoList: Task[] = [
    {
      id: '1',
      value: 'Cook food',
      completed: false,
      deleted: false,
    },
    {
      id: '2',
      value: 'Clean Bed',
      completed: true,
      deleted: false,
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  checkBoxClicked(index: number) {
    this.todoList[index].completed = !this.todoList[index].completed;
  }

  deleteTask(task: Task) {
    console.log(task);
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
      console.log(result);
      // Optional: do something with the result
    });
  }

  trackByItems(index: number, task: Task): string {
    return task.id;
  }
}
