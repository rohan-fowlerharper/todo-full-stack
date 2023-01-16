import { useState } from 'react'
import { addTodo } from '../actions/todos'
import { useAppDispatch } from '../hooks'

function AddTodo() {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        dispatch(addTodo(text))
        setText('')
      }}
    >
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}

export default AddTodo
