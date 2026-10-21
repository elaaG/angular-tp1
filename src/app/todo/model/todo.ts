export const TODO_STATUSES = ['waiting', 'in progress', 'done'] as const;

export type TodoStatus = (typeof TODO_STATUSES)[number];

export interface Todo {
  id: number;
  name: string;
  content: string;
  status: TodoStatus;
}
