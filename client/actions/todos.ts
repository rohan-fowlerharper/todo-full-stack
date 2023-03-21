import type { ThunkAction } from '../store'
import type { Todo } from '../../models/todo'
import * as API from '../apis/todos'

export type TodoAction =
  | { type: 'ADD_TODO'; todo: Todo }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'UPDATE_TODO'; todo: Todo }
  | { type: 'DELETE_COMPLETED_TODOS' }
  | { type: 'FETCH_TODOS_SUCCESS'; todos: Todo[] }
  | { type: 'FETCH_TODOS_ERROR'; error: string }
  | { type: 'FETCH_TODOS_LOADING' }

export const addTodo = (text: string): ThunkAction => {
  return (dispatch) => {
    return API.postTodo(text)
      .then((todo) => {
        dispatch({ type: 'ADD_TODO', todo })
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          dispatch({ type: 'FETCH_TODOS_ERROR', error: err.message })
        }
      })
  }
}

export const getTodos = (): ThunkAction => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_TODOS_LOADING' })
    return API.getTodos()
      .then((todos) => {
        dispatch({ type: 'FETCH_TODOS_SUCCESS', todos })
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          dispatch({ type: 'FETCH_TODOS_ERROR', error: err.message })
        }
      })
  }
}

export const deleteTodo = (id: number): ThunkAction => {
  return (dispatch) => {
    return API.deleteTodo(id)
      .then(() => {
        dispatch({ type: 'DELETE_TODO', id })
      })
      .catch((_err: unknown) => {
        // would be nice to display a toast here
        console.error(_err)
      })
  }
}

export const toggleTodoStatus = (todo: Todo): ThunkAction => {
  const { completed, id } = todo

  const toggled = !completed

  return (dispatch) => {
    return API.updateTodoStatus(id, toggled)
      .then((updatedTodo) => {
        dispatch({ type: 'UPDATE_TODO', todo: updatedTodo })
      })
      .catch((_err: unknown) => {
        // would be nice to display a toast here
        console.error(_err)
      })
  }
}

export const editTodo = (id: number, text: string): ThunkAction => {
  return (dispatch) => {
    return API.updateTodoText(id, text)
      .then((updatedTodo) => {
        dispatch({ type: 'UPDATE_TODO', todo: updatedTodo })
      })
      .catch((_err: unknown) => {
        // would be nice to display a toast here
        console.error(_err)
      })
  }
}

export const deleteCompletedTodos = (): ThunkAction => {
  return (dispatch) => {
    return API.deleteCompletedTodos()
      .then(() => {
        dispatch({ type: 'DELETE_COMPLETED_TODOS' })
      })
      .catch((_err: unknown) => {
        // would be nice to display a toast here
        console.error(_err)
      })
  }
}
