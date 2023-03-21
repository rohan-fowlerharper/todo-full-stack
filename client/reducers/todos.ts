import type { Todo } from '../../models/todo'

import type { TodoAction } from '../actions/todos'

type TodoState =
  | {
      data: Todo[]
      loading: false
      error: null
    }
  | {
      data: Todo[] | null
      loading: true
      error: null
    }
  | {
      data: Todo[] | null
      loading: false
      error: string
    }

const initialState: TodoState = {
  data: null,
  loading: true,
  error: null,
}

export default function todosReducer(
  state = initialState,
  action: TodoAction
): TodoState {
  switch (action.type) {
    case 'FETCH_TODOS_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'FETCH_TODOS_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.todos,
        error: null,
      }
    case 'FETCH_TODOS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case 'ADD_TODO':
      return {
        ...state,
        data: [...(state.data || []), action.todo],
      }
    case 'UPDATE_TODO':
      return {
        ...state,
        data:
          state.data?.map((todo) =>
            todo.id === action.todo.id ? action.todo : todo
          ) ?? [],
      }
    case 'DELETE_TODO':
      return {
        ...state,
        data: state.data?.filter((todo) => todo.id !== action.id) ?? [],
      }
    case 'DELETE_COMPLETED_TODOS':
      return {
        ...state,
        data: state.data?.filter((todo) => !todo.completed) ?? [],
      }
    default:
      return state
  }
}
