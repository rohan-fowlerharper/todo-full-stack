import { combineReducers } from 'redux'
import filterReducer from './filter'
import todosReducer from './todos'

export default combineReducers({
  todos: todosReducer,
  filter: filterReducer,
})
