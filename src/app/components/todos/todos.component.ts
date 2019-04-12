import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;
  error: string;

  constructor(private todoSvc: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos$ = this.todoSvc.findAll().pipe(
      catchError((err: HttpErrorResponse) => {
        this.error = err.message;
        return of([]);
      })
    );
  }

  onComplete(id: number): void {
    this.todoSvc
      .setCompleted(id, true)
      .subscribe(() => this.loadTodos(), (err: HttpErrorResponse) => (this.error = err.message));
  }

  onUndo(id: number): void {
    this.todoSvc
      .setCompleted(id, false)
      .subscribe(() => this.loadTodos(), (err: HttpErrorResponse) => (this.error = err.message));
  }

  toggleError(): void {
    this.error = this.error ? null : 'Something went wrong!';
    if (this.error) {
      this.todos$ = of([]);
    } else {
      this.loadTodos();
    }
  }

  toggleTodos(): void {
    this.loadTodos();
    this.error = null;
  }
}
