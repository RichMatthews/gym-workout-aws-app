import { SET_CURRENT_EXERCISE } from '../../types'

const initialState = {
  current: '',
  searched: false,
}

const getLatestWeightLifted = exercise => {
  if (exercise.previousWeights) {
    const exerciseFound = exercise.previousWeights.sort((a, b) => {
      return b.date - a.date
    })
    return exerciseFound[0].weight
  }
  return
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_EXERCISE:
      return {
        ...state,
        current: {
          ...action.exercise,
          lastWeightLifted: getLatestWeightLifted(action.exercise),
        },
        searched: true,
      }
    case 'RESET_EXERCISE_SEARCH':
      return {
        ...state,
        current: '',
        searched: false,
      }
    default:
      return state
  }
}
