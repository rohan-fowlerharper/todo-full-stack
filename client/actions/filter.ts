export type FilterAction = {
  type: 'SET_FILTER'
  filter: Filter
}

export type Filter = 'all' | 'active' | 'completed'

export function changeFilter(filter: Filter) {
  return {
    type: 'SET_FILTER',
    filter,
  }
}
