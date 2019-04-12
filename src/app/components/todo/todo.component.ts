import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { UpdateTodoSuccess, UpdateTodoFailure } from 'src/app/store/actions/todo.actions';
import { HttpErrorResponse } from '@angular/common/http';

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
