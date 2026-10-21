import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TODO_STATUSES, TodoStatus } from '../model/todo';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  protected groups = this.todoService.todosByStatus;
  protected statuses = TODO_STATUSES;
  protected titles: Record<TodoStatus, string> = {
    waiting: 'Waiting',
    'in progress': 'In Progress Todos',
    done: 'Done Todos',
  };

  protected styles: Record<TodoStatus, string> = {
    waiting: 'alert-secondary',
    'in progress': 'alert-warning',
    done: 'alert-success',
  };

  protected name = signal('');
  protected content = signal('');

  addTodo(): void {
    if (!this.name().trim() || !this.content().trim()) return;
    this.todoService.addTodo(this.name(), this.content());
    this.name.set('');
    this.content.set('');
  }

  move(id: number, status: TodoStatus): void {
    this.todoService.changeStatus(id, status);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
