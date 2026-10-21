import { Injectable, computed, inject, signal } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';
import { LoggerService } from '../../services/logger.service';

let n = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  private readonly _todos = signal<Todo[]>([]);
  readonly todos = this._todos.asReadonly();

  readonly todosByStatus = computed(() => {
    const groups: Record<TodoStatus, Todo[]> = {
      waiting: [],
      'in progress': [],
      done: [],
    };
    for (const todo of this._todos()) {
      groups[todo.status].push(todo);
    }
    return groups;
  });

  addTodo(name: string, content: string): void {
    const todo: Todo = { id: n++, name, content, status: 'waiting' };
    this._todos.update((todos) => [...todos, todo]);
  }

  changeStatus(id: number, status: TodoStatus): void {
    this._todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo)),
    );
  }

  deleteTodo(id: number): void {
    this._todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  logTodos(): void {
    this.loggerService.logger(this._todos());
  }
}
