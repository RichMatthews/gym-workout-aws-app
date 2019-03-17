export const EXERCISE_URL = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://zn14621n56.execute-api.us-east-1.amazonaws.com/default/gymWorkout/'
  }
  return 'https://zn14621n56.execute-api.us-east-1.amazonaws.com/default/gymWorkout/'
}

export const WORKOUT_URL = process => {
  if (process.env.NODE_ENV === 'development') {
    return '/workouts'
  }
  return 'http://34.239.110.214:5000/workouts'
}
