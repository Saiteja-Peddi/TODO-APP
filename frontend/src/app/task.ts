export interface Task {
  id: string;
  value: string;
  completed: boolean;
  deleted: boolean;
}

export interface EditDialogData {
  taskData: Task;
}
