import AddTodo from './AddTodo'
import TodoList from './TodoList'
import { getTodos } from '../actions/todos'
import { useAppDispatch } from '../hooks'
import { useEffect } from 'react'
import Footer from './Footer'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <section className="main">
          <TodoList />
          <AddTodo />
        </section>
        <section className="footer">
          <Footer />
        </section>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
      </footer>
    </>
  )
}

export default App
