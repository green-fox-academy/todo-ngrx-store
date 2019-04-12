import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { AppState } from 'src/app/store';
import {
  LoadTodosFailure,
  LoadTodosSuccess,
  UpdateTodoFailure,
  UpdateTodoSuccess
} from 'src/app/store/actions/todo.actions';
import { getLoadTodosError, getTodos, getUpdateTodoError } from 'src/app/store/selectors/todo.selectors';

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
    this.todoSvc.findAll().subscribe(
      (todos: Todo[]) => {
        this.store.dispatch(new LoadTodosSuccess(todos));
      },
      () => {
        this.store.dispatch(new LoadTodosFailure('Something went wrong'));
      }
    );
  }

  dispatchError(): void {
    this.store.dispatch(new LoadTodosFailure('Something went wrong'));
  }

  dispatchLoadTodos(): void {
    this.loadTodos();
  }
}
