import React from 'react'
import styled from 'styled-components'
import Picker from 'react-mobile-picker-scroll'

const StyledPicker = styled(Picker)`
  color: red;
`

const numberOptions = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
]

export class AddExercise extends React.Component {
  state = {
    valueGroups: {
      sets: 0,
      reps: 0,
      weight: 0,
    },
    optionGroups: {
      sets: numberOptions,
      reps: numberOptions,
      weight: numberOptions,
    },
  }

  handleChange = (name, value) => {
    this.setState(({ valueGroups }) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value,
      },
    }))
  }

  render() {
    const { optionGroups, valueGroups } = this.state
    const {
      addExerciseToCurrentWorkout,
      exerciseInfo,
    } = this.props

    const exerciseData = {
      ...valueGroups,
      name: exerciseInfo.name,
      id: exerciseInfo.id,
    }
    console.log(exerciseInfo, 'ei')
    return (
      <div>
        <StyledPicker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={this.handleChange}
        />
        <div>
          Sets: {valueGroups.sets}
          Reps: {valueGroups.reps}
          Weight: {valueGroups.weight}
        </div>
        <button onClick={() => addExerciseToCurrentWorkout(exerciseData)}>
          Add exercise
        </button>
      </div>
    )
  }
}
