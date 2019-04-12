import { Todo } from 'src/app/models/Todo';

import { TodoAction } from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  error: null
};

export function todoReducer(state: TodoState = initialState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'SUCCESSFULLY LOADED TODOS': {
      const todos = action.payload;
      return {
        ...state,
        error: null,
        todos
      };
    }
    case 'FAILED TO LOAD TODOS': {
      return {
        ...state,
        todos: [],
        error: action.payload
      };
    }
    case 'SUCCESSFULLY UPDATED TODO': {
      const updatedTodo = action.payload;
      const todos = state.todos.map((todo: Todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
      return {
        ...state,
        todos,
        error: null
      };
    }
    case 'FAILED TO UPDATE TODO': {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
