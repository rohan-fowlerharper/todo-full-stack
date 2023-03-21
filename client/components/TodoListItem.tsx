import { useState } from 'react'
import { Todo } from '../../models/todo'
import { deleteTodo, editTodo, toggleTodoStatus } from '../actions/todos'
import { useAppDispatch } from '../hooks'

interface TodoListItemProps {
  todo: Todo
}

export default function TodoListItem({ todo }: TodoListItemProps) {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <li
      onDoubleClick={() => {
        setIsEditing(true)
      }}
      className={isEditing ? 'editing' : todo.completed ? 'completed' : ''}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodoStatus(todo))}
        />
        <label>{todo.text}</label>
        <button
          className="destroy"
          aria-label="delete"
          onClick={() => dispatch(deleteTodo(todo.id))}
        />
      </div>
      {isEditing && (
        <EditField
          id={todo.id}
          text={todo.text}
          onSuccess={() => setIsEditing(false)}
        />
      )}
    </li>
  )
}

function EditField({
  id,
  text,
  onSuccess,
}: {
  id: number
  text: string
  onSuccess: () => void
}) {
  const dispatch = useAppDispatch()
  const [newText, setNewText] = useState(text)

  async function handleSubmit() {
    await dispatch(editTodo(id, newText))
    onSuccess()
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await handleSubmit()
      }}
    >
      <input
        className="edit"
        value={newText}
        onBlur={handleSubmit}
        onChange={(e) => {
          setNewText(e.target.value)
        }}
      />
    </form>
  )
}
