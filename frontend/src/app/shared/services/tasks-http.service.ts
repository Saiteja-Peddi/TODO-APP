import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  NewTask,
  Task,
  HttpGetAllTasks,
  HttpOtherResponse,
} from '../interface';

@Injectable()
export class TasksHttpService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get<HttpGetAllTasks>(this.baseUrl + '/tasks', {
      observe: 'response',
    });
  }

  addTask(task: NewTask) {
    return this.http.post<HttpOtherResponse>(this.baseUrl + '/tasks', task, {
      observe: 'response',
    });
  }

  updateTask(task: Task) {
    return this.http.put<HttpOtherResponse>(
      this.baseUrl + '/tasks/' + task._id,
      task,
      {
        observe: 'response',
      }
    );
  }

  deleteTask(task: Task) {
    return this.http.delete<HttpOtherResponse>(
      this.baseUrl + '/tasks/' + task._id,
      {
        observe: 'response',
      }
    );
  }

  cleanDB(){
    return this.http.delete<HttpOtherResponse>(
      this.baseUrl + '/tasks/removeDeletedTasks',
      {
        observe: 'response',
      }
    );
  }
}
