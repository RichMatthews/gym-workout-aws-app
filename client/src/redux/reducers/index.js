import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import exerciseData from './exerciseData'
import exerciseModal from './exerciseModal'
import workouts from './workouts'

export default history =>
  combineReducers({
    router: connectRouter(history),
    exerciseData,
    exerciseModal,
    workouts,
  })
