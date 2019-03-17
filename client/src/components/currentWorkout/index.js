import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { submitWorkout } from 'redux/action-creators/workouts'

export class CurrentWorkout extends React.Component {
  state = {
    currentWorkout: [],
  }

  componentDidMount() {
    const currentWorkoutFromLocalStorage = window.localStorage.getItem(
      'currentWorkout'
    )
    if (currentWorkoutFromLocalStorage) {
      this.setState({
        currentWorkout: JSON.parse(currentWorkoutFromLocalStorage),
      })
    } else {
      this.setState({ currentWorkout: this.props.currentWorkout })
    }
  }

  convertToFormat(workout) {
    return workout.map(Object.values)
  }

  render() {
    const { currentWorkout } = this.state

    return (
      <div>
        <h3> Current Workout </h3>
        {currentWorkout.length ? (
          <div>
            <table>
              <tr>
                <th>Exercise name</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
              </tr>
              {currentWorkout.map(exercise => (
                <tr>
                  <td>{exercise.name}</td>
                  <td>{exercise.sets}</td>
                  <td>{exercise.reps}</td>
                  <td>{exercise.weight}kg</td>
                </tr>
              ))}
            </table>
            <button
              onClick={() =>
                this.props.submitWorkout(this.convertToFormat(currentWorkout))
              }
            >
              {' '}
              Submit workout{' '}
            </button>
          </div>
        ) : (
          <div>You do not currently have a workout in progress</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ workouts: { currentWorkout } }) => ({
  currentWorkout,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitWorkout }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentWorkout)
