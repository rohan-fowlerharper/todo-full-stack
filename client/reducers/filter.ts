import type { Filter, FilterAction } from '../actions/filter'

const initialState: Filter = 'all'

export default function filterReducer(
  state = initialState,
  action: FilterAction
) {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}
