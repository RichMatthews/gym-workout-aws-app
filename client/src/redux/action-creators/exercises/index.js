import { SET_CURRENT_EXERCISE } from 'redux/types'
import axios from 'axios'

export const searchForExercise = exercise => {
  return dispatch => {
    axios({
      method: 'get',
      url: '/exercises',
    }).then(data => {
      const foundExercise = data.data.filter(
        ex => ex.name.toLowerCase() === exercise.value.toLowerCase()
      )
      dispatch(setCurrentExercise(foundExercise[0]))
    })
  }
}

const setCurrentExercise = exercise => {
  return {
    type: SET_CURRENT_EXERCISE,
    exercise,
  }
}

export const resetExerciseSearch = () => {
  return {
    type: 'RESET_EXERCISE_SEARCH',
  }
}

export const addExerciseToCurrentWorkout = exercise => {
  return dispatch => {
    dispatch({ type: 'ADD_EXERCISE_TO_CURRENT_WORKOUT', exercise })
    dispatch({ type: 'TOGGLE_MODAL' })
  }
}
