import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducers';

export const getTodoState = createFeatureSelector('todo');

export const getTodos = createSelector(
  getTodoState,
  (state: TodoState) => state.todos
);

export const getLoadTodosError = createSelector(
  getTodoState,
  (state: TodoState) => state.loadTodosError
);

export const getUpdateTodoError = createSelector(
  getTodoState,
  (state: TodoState) => state.updateTodoError
);
