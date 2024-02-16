export interface HttpOtherResponse {
  success: boolean;
  message?: string;
  task?: Task;
}

export interface HttpGetAllTasks {
  success: boolean;
  tasks: Task[];
  message?: string;
}

export interface HttpGetTask {
  success: boolean;
  task: Task;
  message?: string;
}

export interface Task {
  _id: string;
  value: string;
  completed: boolean;
  deleted: boolean;
}

export interface NewTask {
  value: string;
  completed: boolean;
  deleted: boolean;
}

export interface EditDialogData {
  taskData: Task;
}
