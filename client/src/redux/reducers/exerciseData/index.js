import { SET_CURRENT_EXERCISE, RESET_EXERCISE_SEARCH } from '../../types'

const initialState = {
  current: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_EXERCISE:
      window.localStorage.setItem('current', JSON.stringify(action.exercise))
      return {
        ...state,
        current: {
          ...action.exercise,
        },
      }
    case RESET_EXERCISE_SEARCH:
      return {
        ...state,
        current: '',
      }
    default:
      return state
  }
}
