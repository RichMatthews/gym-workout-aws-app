import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'

import {
  resetExerciseSearch,
  searchForExercise,
} from 'redux/action-creators/exercises'
import { StyledSelect } from 'components/workout'
import { toggleModal } from 'redux/action-creators/modal'
import { addExerciseToCurrentWorkout } from 'redux/action-creators/exercises'
import { Button } from 'components/shared/button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const SearchContainer = styled.div`
  width: 90%;
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

class Search extends React.Component {
  state = {
    searchTerm: '',
    exercises: [],
  }

  componentDidMount() {
    axios
      .get(
        'https://zn14621n56.execute-api.us-east-1.amazonaws.com/default/gymWorkout'
      )
      .then(data => {
        const exercises = data.data
        exercises.forEach(exercise => {
          const mergedExercise = {
            ...exercise,
            value: exercise.name,
            label: exercise.name,
          }
          this.setState({
            exercises: this.state.exercises.concat(mergedExercise),
          })
        })
      })
  }

  handleChange(value) {
    this.setState({ searchTerm: value })
  }

  render() {

    return (
      <Container>
        <SearchContainer>
          <StyledSelect
            options={this.state.exercises}
            placeholder="search for an exercise"
            onChange={value => this.handleChange(value)}
          />
          <Button
            text="search..."
            onClick={() => this.props.searchForExercise(this.state.searchTerm)}
          />
        </SearchContainer>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchForExercise,
      resetExerciseSearch,
      toggleModal,
      addExerciseToCurrentWorkout,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(Search)
