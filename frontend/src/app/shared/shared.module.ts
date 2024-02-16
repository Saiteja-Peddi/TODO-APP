import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors';
import { TasksHttpService } from './services/tasks-http.service';
import { LoaderService } from './services/loader.service';
import { PopupMsgComponent } from './components/popup-msg/popup-msg.component';
import { MaterialModule } from '../material/material.module';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PopupMsgComponent,
    EditTaskComponent,
    TodoFormComponent,
    TodoListComponent,
  ],
  imports: [HttpClientModule, MaterialModule, ReactiveFormsModule],
  exports: [TodoFormComponent, TodoListComponent],
  providers: [TasksHttpService, LoaderService, httpInterceptorProviders],
})
export class SharedModule {}
