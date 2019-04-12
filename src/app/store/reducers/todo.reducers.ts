import { Todo } from 'src/app/models/Todo';

import { TodoAction } from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
  loadTodosError: string | null;
  updateTodoError: string | null;
}

export const initialState: TodoState = {
  todos: [],
  loadTodosError: null,
  updateTodoError: null
};

export function todoReducer(state: TodoState = initialState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'SUCCESSFULLY LOADED TODOS': {
      const todos = action.payload;
      return {
        ...state,
        loadTodosError: null,
        todos
      };
    }
    case 'FAILED TO LOAD TODOS': {
      return {
        ...state,
        todos: [],
        loadTodosError: action.payload
      };
    }
    case 'SUCCESSFULLY UPDATED TODO': {
      const updatedTodo = action.payload;
      const todos = state.todos.map((todo: Todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
      return {
        ...state,
        todos,
        updateTodoError: null
      };
    }
    case 'FAILED TO UPDATE TODO': {
      return {
        ...state,
        updateTodoError: action.payload
      };
    }
    default:
      return state;
  }
}
