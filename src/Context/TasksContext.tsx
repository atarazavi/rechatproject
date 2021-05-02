import React from "react";

export interface TaskType {
  id: number;
  createdAt: Date;
  name: string;
  description: string;
  status: string;
}

export interface LogsType {
  id: number;
  createdAt: Date;
  relatedTaskID: number;
  before: string;
  after: string;
  type: string;
}

export interface TasksContextData {
  tasks: TaskType[];
  logs: LogsType[];
  isLoading: boolean;
  toBEditedTaskID: number | null; 
  apiError: string | null; 
  editThisID: (taskId: number | null) => void;
  fetchTasks: () => void;
  fetchLogs: () => void;
  editTask: (taskId: number, name: string, description: string, status: string) => void;
  addTask: (name: string, description: string) => void;
}
 
export const tasksContextDefaultValue: TasksContextData = {
  tasks: [],
  logs: [],
  isLoading: false,
  apiError: null,
  toBEditedTaskID: null,
  editThisID: () => null,
  fetchTasks: () => null,
  fetchLogs: () => null,
  editTask: () => null,
  addTask: () => null,
}
 
export const TasksContext = React.createContext<TasksContextData>(tasksContextDefaultValue);
 