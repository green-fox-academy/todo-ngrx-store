import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducers';

export const getTodoState = createFeatureSelector('todo');

export const getTodos = createSelector(
  getTodoState,
  (state: TodoState) => state.todos
);

export const getError = createSelector(
  getTodoState,
  (state: TodoState) => state.error
);
