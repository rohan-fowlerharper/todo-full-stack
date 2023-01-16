import type { Filter, FilterAction } from '../actions/filter'

type FilterState = { status: Filter }

const initialState: FilterState = {
  status: 'all',
}

export default function filterReducer(
  state = initialState,
  action: FilterAction
) {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        status: action.status,
      }
    default:
      return state
  }
}
