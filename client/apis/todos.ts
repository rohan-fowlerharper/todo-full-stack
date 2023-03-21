import request from 'superagent'
import type { Todo } from '../../models/todo'

export async function getTodos(): Promise<Todo[]> {
  return request.get('/api/v1/todos').then((res) => res.body)
}

export async function postTodo(text: string): Promise<Todo> {
  return request
    .post('/api/v1/todos')
    .send({ text })
    .then((res) => res.body)
}

export async function deleteTodo(id: number): Promise<void> {
  return request.delete(`/api/v1/todos/${id}`).then((res) => res.body)
}

export async function deleteCompletedTodos(): Promise<void> {
  return request.delete('/api/v1/todos/completed').then((res) => res.body)
}

export async function updateTodoStatus(
  id: number,
  completed: boolean
): Promise<Todo> {
  return request
    .patch(`/api/v1/todos/${id}`)
    .send({ completed })
    .then((res) => res.body)
}

export async function updateTodoText(id: number, text: string): Promise<Todo> {
  return request
    .patch(`/api/v1/todos/${id}`)
    .send({ text })
    .then((res) => res.body)
}
