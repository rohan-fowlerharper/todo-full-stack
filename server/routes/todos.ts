import { Router } from 'express'
import type { Response } from 'express'
import type { Todo } from '../../models/todo'

const router = Router()

// TODO: add database lol

let todos: Todo[] = [
  {
    id: 1,
    text: 'Todo 1',
    completed: false,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    id: 2,
    text: 'Todo 2',
    completed: true,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
]

let nextId = 3

router.get('/', (req, res: Response<Todo[]>) => {
  res.json(todos)
})

router.post('/', (req, res: Response<Todo | string>) => {
  const { text } = req.body

  if (text === undefined) {
    res.sendStatus(400)
  }

  const newTodo = {
    id: nextId++,
    text,
    completed: false,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  }

  todos.push(newTodo)

  res.json(newTodo)
})

router.patch('/:id', (req, res: Response<Todo | string>) => {
  const { id } = req.params
  const { text, completed } = req.body

  if (text === undefined && completed === undefined) {
    res.sendStatus(400)
    return
  }

  const todo = todos.find((todo) => todo.id === Number(id))

  if (todo === undefined) {
    res.sendStatus(404)
    return
  }

  if (text !== undefined) {
    todo.text = text
  } else if (completed !== undefined) {
    todo.completed = completed
  }

  res.json(todo)
})

router.delete('/completed', (req, res: Response<string>) => {
  todos = todos.filter((todo) => !todo.completed)

  res.sendStatus(204)
})

router.delete('/:id', (req, res: Response<string>) => {
  const { id } = req.params

  const todoIndex = todos.findIndex((todo) => todo.id === Number(id))

  if (todoIndex === -1) {
    res.sendStatus(404)
    return
  }

  todos.splice(todoIndex, 1)

  res.sendStatus(204)
})

export default router
