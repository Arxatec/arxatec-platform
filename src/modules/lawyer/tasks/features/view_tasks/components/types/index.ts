export interface Task {
  id: string;
  content: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
