export const EXERCISE_URL = () => {
  if (process.env.NODE_ENV === 'development') {
    return '/exercises'
  }
  return 'http://34.239.110.214:5000/exercises'
}

export const WORKOUT_URL = process => {
  if (process.env.NODE_ENV === 'development') {
    return '/workouts'
  }
  return 'http://34.239.110.214:5000/workouts'
}
