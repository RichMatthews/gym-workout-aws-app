import { EXERCISE_URL } from 'urls'
import { SET_CURRENT_EXERCISE } from 'redux/types'
import axios from 'axios'
import { push } from 'connected-react-router'

export const searchForExercise = exercise => {
  return dispatch => {
    axios({
      method: 'get',
      url: EXERCISE_URL(),
    }).then(data => {
      const foundExercise = data.data.filter(
        ex => ex.name.toLowerCase() === exercise.value.toLowerCase()
      )
      dispatch(setCurrentExercise(foundExercise[0]))
      dispatch(push(`/search/${exercise.name}`))
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
  console.log(exercise, 'e1')
  return dispatch => {
    dispatch({ type: 'ADD_EXERCISE_TO_CURRENT_WORKOUT', exercise })
  }
}
