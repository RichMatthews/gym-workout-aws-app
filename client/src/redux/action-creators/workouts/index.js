import axios from 'axios'

import { WORKOUT_URL } from 'urls'
import {
  SAVE_WORKOUT,
  SUBMIT_WORKOUT,
  TOGGLE_SHOWING_WORKOUT,
} from 'redux/types'

export const submitWorkout = (workout, date) => {
  return dispatch => {
    dispatch({ type: SUBMIT_WORKOUT, workout, date })
    dispatch(updateExerciseOnServer(workout))
  }
}

export const updateExerciseOnServer = workout => {
  return () => {
    axios({
      method: 'post',
      url:
        'https://zn14621n56.execute-api.us-east-1.amazonaws.com/default/gym-workout-post-workout',
      data: {
        date: Date.now(),
        workoutExercises: workout,
      },
    })
  }
}

export const fetchPreviousWorkouts = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: WORKOUT_URL(process),
    }).then(data => {
      dispatch(loadPreviousWorkoutsToStore(data.data))
    })
  }
}

const loadPreviousWorkoutsToStore = workouts => {
  return dispatch => {
    dispatch({ type: SAVE_WORKOUT, workouts })
  }
}

export const toggleShowingWorkout = workout => {
  return {
    type: TOGGLE_SHOWING_WORKOUT,
    workout,
  }
}
