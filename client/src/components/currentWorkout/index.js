import React from 'react'
import { connect } from 'react-redux'

export const CurrentWorkout = ({ currentWorkout }) => (
  <div>
    <h3> Current Workout </h3>
    {currentWorkout.length ? (
      <table>
        <tr>
          <th>Exercise name</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>Weight</th>
        </tr>
        {this.props.currentWorkout.map(exercise => (
          <tr>
            <td>{exercise.name}</td>
            <td>{exercise.sets}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}kg</td>
          </tr>
        ))}
      </table>
    ) : (
      <div>You do not currently have a workout in progress</div>
    )}
  </div>
)

const mapStateToProps = ({ workouts: { currentWorkout } }) => ({
  currentWorkout,
})

export default connect(mapStateToProps)(CurrentWorkout)
