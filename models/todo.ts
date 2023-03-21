export interface TodoCreate {
  text: string
}

export interface Todo extends TodoCreate {
  id: number
  completed: boolean
  createdAt: string
  updatedAt: string
}
