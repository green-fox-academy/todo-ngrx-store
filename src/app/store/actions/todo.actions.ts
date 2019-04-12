import { Action } from '@ngrx/store';
import { Todo } from 'src/app/models/Todo';
import { importExpr } from '@angular/compiler/src/output/output_ast';

export class LoadTodos implements Action {
  readonly type = 'LOAD TODOS';
}

export class LoadTodosSuccess implements Action {
  readonly type = 'SUCCESSFULLY LOADED TODOS';

  constructor(public payload: Todo[]) {}
}

export class LoadTodosFailure implements Action {
  readonly type = 'FAILED TO LOAD TODOS';

  constructor(public payload: string) {}
}

export class UpdateTodo implements Action {
  readonly type = 'UPDATE TODO';

  constructor(public payload: { id: number; completed: boolean }) {}
}

export class UpdateTodoSuccess implements Action {
  readonly type = 'SUCCESSFULLY UPDATED TODO';

  constructor(public payload: Todo) {}
}

export class UpdateTodoFailure implements Action {
  readonly type = 'FAILED TO UPDATE TODO';

  constructor(public payload: string) {}
}

export type TodoAction =
  | LoadTodos
  | LoadTodosSuccess
  | LoadTodosFailure
  | UpdateTodo
  | UpdateTodoSuccess
  | UpdateTodoFailure;
