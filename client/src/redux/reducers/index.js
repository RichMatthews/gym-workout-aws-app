import { combineReducers } from 'redux'
import currentWorkoutModal from './currentWorkoutModal'
import exerciseData from './exerciseData'
import exerciseModal from './exerciseModal'
import workouts from './workouts'

const rootReducer = combineReducers({
  currentWorkoutModal,
  exerciseData,
  exerciseModal,
  workouts,
})

export default rootReducer
