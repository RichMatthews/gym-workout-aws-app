import React, { Component } from 'react'
import {
  fetchPreviousWorkouts,
  toggleShowingWorkout,
} from 'redux/action-creators/workouts'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
  background: #000;
  padding: 3px;
  margin-bottom: 10px;
`

const PreviousWorkoutContainer = styled.div`
  padding: 10px;
  margin-bottom: 1rem;
  background: #fff;
`

const Table = styled.table`
  > tr:nth-child(even){border-bottom: 1px solid black;}
  border-collapse: collapse;
  border-spacing: 0;
`

const TableHeading = styled.th`
  text-align: left;
  padding: 10px 10px 10px 0;
`

const TableData = styled.td`
  padding: 10px 10px 10px 0;
`

const WorkoutDate = styled.span`
  font-size: 15px;
`

class Main extends Component {

  state = {
    workoutsToShow: 3
  }

  componentDidMount() {
    this.props.fetchPreviousWorkouts()
  }

  showMoreWorkouts() {
    this.setState({workoutsToShow: this.state.workoutsToShow += 1})
  }

  render() {
    const workoutsOrderedbyData = this.props.workouts.previousWorkouts.sort((a, b) => b.date - a.date)
    return (
      <Container>
        <h4> Previous workouts </h4>
        <button onClick={() => this.showMoreWorkouts()}>show more</button>
        {workoutsOrderedbyData.slice(0, this.state.workoutsToShow).map(workout => {
          const date = moment(workout.date).format('DD-MM-YYYY')
          return (
            <div onClick={() => this.props.toggleShowingWorkout(workout)}>
              {workout.isShowing ? (
                <PreviousWorkoutContainer>
                  <h3>Workout Summary</h3>
                  {date}
                  {'time started'}
                  {'time ended'}
                  <Table>
                    <tr>
                      <TableHeading>Exercise name</TableHeading>
                      <TableHeading>Sets</TableHeading>
                      <TableHeading>Reps</TableHeading>
                      <TableHeading>Weight</TableHeading>
                    </tr>
                    {workout.workoutExercises.workouts.map(exercise => (
                      <tr>
                        <TableData>{exercise.name}</TableData>
                        <TableData>{exercise.sets}</TableData>
                        <TableData>{exercise.reps}</TableData>
                        <TableData>{exercise.weight}kg</TableData>
                      </tr>
                    ))}
                  </Table>
                </PreviousWorkoutContainer>
              ) : (
                <PreviousWorkoutContainer>
                  <WorkoutDate> {date} Click to view workout </WorkoutDate>
                </PreviousWorkoutContainer>
              )}
            </div>
          )
        })}
      </Container>
    )
  }
}

const mapStateToProps = ({ workouts }) => ({
  workouts,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchPreviousWorkouts, toggleShowingWorkout }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
