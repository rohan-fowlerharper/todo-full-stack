import { useAppSelector } from '../hooks'
import TodoListItem from './TodoListItem'

export default function TodoList() {
  const { loading, error, data: todos } = useAppSelector((state) => state.todos)
  const filter = useAppSelector((state) => state.filter)

  if (loading) {
    return <p>Loading...</p>
  }

  if (error !== null) {
    return <p>Error!</p>
  }

  let renderedTodos = todos
  if (filter === 'active') {
    renderedTodos = todos.filter((todo) => !todo.completed)
  } else if (filter === 'completed') {
    renderedTodos = todos.filter((todo) => todo.completed)
  }

  return (
    <ul className="todo-list">
      {renderedTodos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
