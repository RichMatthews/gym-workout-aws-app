import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'

import {
  resetExerciseSearch,
  searchForExercise,
} from 'redux/action-creators/exercises'
import { EXERCISE_URL } from 'urls'
import { StyledSelect } from 'components/workout'
import { SearchedExercise } from './searchedExercise'
import { toggleModal } from 'redux/action-creators/modal'
import { addExerciseToCurrentWorkout } from 'redux/action-creators/exercises'
import { Button } from 'components/shared/button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: auto;
`

const SearchContainer = styled.div`
  width: 90%;
  margin: auto;
`

const SearchResult = styled.div`
  font-size: 18px;
`

const NoSearchResult = styled.div`
  padding: 10px;
`

class Search extends React.Component {
  state = {
    searchTerm: '',
    exercises: [],
  }

  componentDidMount() {
    axios.get(EXERCISE_URL()).then(data => {
      data.data.map(exercise => {
        this.setState({
          exercises: this.state.exercises.concat({
            value: exercise.name,
            label: exercise.name,
          }),
        })
      })
    })
  }

  handleChange(value) {
    this.setState({ searchTerm: value })
  }

  render() {
    const { exerciseData, resetExerciseSearch } = this.props
    return (
      <Container>
        {!exerciseData.current ? (
          <SearchContainer>
            <StyledSelect
              options={this.state.exercises}
              placeholder="search for an exercise"
              onChange={value => this.handleChange(value)}
            />
            <Button
              text="search..."
              onClick={() =>
                this.props.searchForExercise(this.state.searchTerm)
              }
            />
          </SearchContainer>
        ) : (
          <SearchedExercise
            exerciseData={exerciseData}
            addExerciseToCurrentWorkout={addExerciseToCurrentWorkout}
            resetExerciseSearch={resetExerciseSearch}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = ({ exerciseData }) => ({
  exerciseData,
})

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
  mapStateToProps,
  mapDispatchToProps
)(Search)
