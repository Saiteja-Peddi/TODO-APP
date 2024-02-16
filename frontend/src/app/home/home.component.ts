import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../shared/services/loader.service';
import { TodoListComponent } from '../shared/components/todo-list/todo-list.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(TodoListComponent) todoListComponent!: TodoListComponent;

  todoForm: FormGroup = this.fb.group({
    task: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });
  loadingService: LoaderService;
  constructor(private fb: FormBuilder, private loading: LoaderService) {
    this.loadingService = loading;
  }

  ngOnInit(): void {}

  reloadTasks(flag: boolean) {
    if (flag) {
      this.todoListComponent.getAllTasks();
    }
  }
}
