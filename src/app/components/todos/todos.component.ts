import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { AppState } from 'src/app/store';
import { LoadTodosFailure, LoadTodosSuccess } from 'src/app/store/actions/todo.actions';
import { getError, getTodos } from 'src/app/store/selectors/todo.selectors';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;
  error$: Observable<string>;

  constructor(private todoSvc: TodoService, private store: Store<AppState>) {}

  ngOnInit() {
    this.todos$ = this.store.select(getTodos);
    this.error$ = this.store.select(getError);
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
