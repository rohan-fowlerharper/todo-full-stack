export interface CreateTodo {
  text: string
}

export interface Todo extends CreateTodo {
  id: number
  completed: boolean
  createdAt: string
  updatedAt: string
}
