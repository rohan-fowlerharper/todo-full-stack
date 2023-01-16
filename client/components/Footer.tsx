import { changeFilter, Filter } from '../actions/filter'
import { deleteCompletedTodos } from '../actions/todos'
import { useAppDispatch, useAppSelector } from '../hooks'

export default function Footer() {
  const todosLeft =
    useAppSelector(
      (state) => state.todos.data?.filter((todo) => !todo.completed).length
    ) ?? 0
  const dispatch = useAppDispatch()

  function handleClearCompleted() {
    dispatch(deleteCompletedTodos())
  }

  return (
    <>
      <span className="todo-count">
        <strong>{todosLeft}</strong> item{todosLeft === 1 ? '' : 's'} left
      </span>
      <ul className="filters">
        <li>
          <FilterButton label="all" />
        </li>
        <li>
          <FilterButton label="active" />
        </li>
        <li>
          <FilterButton label="completed" />
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClearCompleted}>
        Clear completed
      </button>
    </>
  )
}

const toTitleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function FilterButton({ label }: { label: Filter }) {
  const { status } = useAppSelector((state) => state.filter)
  const dispatch = useAppDispatch()

  return (
    <button
      className={status === label ? 'selected' : ''}
      onClick={() => dispatch(changeFilter(label))}
    >
      {toTitleCase(label)}
    </button>
  )
}
