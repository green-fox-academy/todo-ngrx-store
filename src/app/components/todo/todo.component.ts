import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { AppState } from 'src/app/store';
import { UpdateTodoFailure, UpdateTodoSuccess } from 'src/app/store/actions/todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo: Todo;

  constructor(private todoSvc: TodoService, private store: Store<AppState>) {}

  complete(id: number) {
    this.todoSvc
      .setCompleted(id, true)
      .subscribe(
        (updatedTodo: Todo) => this.store.dispatch(new UpdateTodoSuccess(updatedTodo)),
        (err: HttpErrorResponse) => this.store.dispatch(new UpdateTodoFailure('Something went wrong'))
      );
  }

  undo(id: number): void {
    this.todoSvc
      .setCompleted(id, false)
      .subscribe(
        (updatedTodo: Todo) => this.store.dispatch(new UpdateTodoSuccess(updatedTodo)),
        (err: HttpErrorResponse) => this.store.dispatch(new UpdateTodoFailure('Something went wrong'))
      );
  }
}
