import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from 'src/app/models/Todo';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  LoadTodos,
  LoadTodosFailure,
  LoadTodosSuccess,
  UpdateTodo,
  UpdateTodoSuccess,
  UpdateTodoFailure
} from 'src/app/store/actions/todo.actions';
import { getTodos, getLoadTodosError, getUpdateTodoError } from 'src/app/store/selectors/todo.selectors';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;
  errorLoadTodos$: Observable<string>;
  errorUpdateTodo$: Observable<string>;

  constructor(private todoSvc: TodoService, private store: Store<AppState>) {}

  ngOnInit() {
    this.todos$ = this.store.select(getTodos);
    this.errorLoadTodos$ = this.store.select(getLoadTodosError);
    this.errorUpdateTodo$ = this.store.select(getUpdateTodoError);
    this.loadTodos();
  }

  loadTodos(): void {
    this.store.dispatch(new LoadTodos());
    this.todoSvc.findAll().subscribe(
      (todos: Todo[]) => {
        this.store.dispatch(new LoadTodosSuccess(todos));
      },
      () => {
        this.store.dispatch(new LoadTodosFailure('Something went wrong'));
      }
    );
  }

  onComplete(id: number): void {
    this.store.dispatch(new UpdateTodo({ id, completed: true }));
    this.todoSvc
      .setCompleted(id, true)
      .subscribe(
        (updatedTodo: Todo) => this.store.dispatch(new UpdateTodoSuccess(updatedTodo)),
        (err: HttpErrorResponse) => this.store.dispatch(new UpdateTodoFailure('Something went wrong'))
      );
  }

  onUndo(id: number): void {
    this.store.dispatch(new UpdateTodo({ id, completed: false }));
    this.todoSvc
      .setCompleted(id, false)
      .subscribe(
        (updatedTodo: Todo) => this.store.dispatch(new UpdateTodoSuccess(updatedTodo)),
        (err: HttpErrorResponse) => this.store.dispatch(new UpdateTodoFailure('Something went wrong'))
      );
  }

  dispatchError(): void {
    this.store.dispatch(new LoadTodosFailure('Something went wrong'));
  }

  dispatchLoadTodos(): void {
    this.loadTodos();
  }
}
