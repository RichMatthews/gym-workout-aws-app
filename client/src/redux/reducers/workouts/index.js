import {
  SAVE_WORKOUT,
  SUBMIT_WORKOUT,
  TOGGLE_SHOWING_WORKOUT,
} from 'redux/types'

const initialState = {
  previousWorkouts: [],
  currentWorkout: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_WORKOUT:
      return {
        ...state,
        previousWorkouts: state.previousWorkouts.concat({
          workoutExercises: action.workout,
          date: action.date,
        }),
      }
    case SAVE_WORKOUT:
      return {
        ...state,
        previousWorkouts: state.previousWorkouts
          .concat(state.previousWorkouts)
          .concat(action.workouts),
      }
    case TOGGLE_SHOWING_WORKOUT:
      return {
        ...state,
        previousWorkouts: state.previousWorkouts.map(workout =>
          workout.id === action.workout.id
            ? { ...workout, isShowing: !workout.isShowing }
            : workout
        ),
      }
    case 'ADD_EXERCISE_TO_CURRENT_WORKOUT':
      return {
        ...state,
        currentWorkout: state.currentWorkout.concat(action.exercise),
      }
    default:
      return state
  }
}
