import { Action } from '@ngrx/store';
import { Todo } from 'src/app/models/Todo';

export class LoadTodosSuccess implements Action {
  readonly type = 'SUCCESSFULLY LOADED TODOS';

  constructor(public payload: Todo[]) {}
}

export class LoadTodosFailure implements Action {
  readonly type = 'FAILED TO LOAD TODOS';

  constructor(public payload: string) {}
}

export class UpdateTodoSuccess implements Action {
  readonly type = 'SUCCESSFULLY UPDATED TODO';

  constructor(public payload: Todo) {}
}

export class UpdateTodoFailure implements Action {
  readonly type = 'FAILED TO UPDATE TODO';

  constructor(public payload: string) {}
}

export type TodoAction = LoadTodosSuccess | LoadTodosFailure | UpdateTodoSuccess | UpdateTodoFailure;
