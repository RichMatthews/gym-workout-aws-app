import React from 'react'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Graph from 'components/graph'
import { addExerciseToCurrentWorkout } from 'redux/action-creators/exercises'
import { AddExercise } from '../addExercise'
import arrow from 'components/search/arrow.svg'
import backArrow from 'components/search/back-arrow.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: #000;
`

const SearchResult = styled.div`
  font-size: 18px;
`

const ExerciseName = styled.h3`
  background: #2b2b29;
  padding: 5px;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
`

const ExerciseNameContainer = styled.div`
  display: flex;
  background: #2b2b29;
`

const GenericContainer = styled.div`
  background: #2b2b29;
  margin-top: 10px;
  text-align: center;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

const ImageContainer = styled.div`
  width: 15px;
  height: 25px;
`

class SearchedExercise extends React.Component {
  state = {
    showGraph: false,
    showAddExercise: false,
    currentExercise: '',
  }

  componentDidMount() {
    const exercise = window.localStorage.getItem('current')
    this.setState({ currentExercise: JSON.parse(exercise) })
  }

  render() {
    const {
      addExerciseToCurrentWorkout,
    } = this.props
    const { currentExercise, showAddExercise, showGraph } = this.state
    return (
      <Container>
        <SearchResult>
          <ExerciseNameContainer>
            <ImageContainer>
              <Link to={'/search'}>
                <img src={backArrow} alt=""/>
              </Link>
            </ImageContainer>
            <ExerciseName>{currentExercise.name}</ExerciseName>
          </ExerciseNameContainer>
          <GenericContainer
            onClick={() => this.setState({ showAddExercise: !showAddExercise })}
          >
            <span> Add to current workout </span>
            <ImageContainer>
              <img src={arrow} alt=""/>
            </ImageContainer>
          </GenericContainer>
          {showAddExercise ? (
            <AddExercise
              exerciseInfo={this.state.currentExercise}
              addExerciseToCurrentWorkout={addExerciseToCurrentWorkout}
            />
          ) : null}
          <GenericContainer
            onClick={() => this.setState({ showGraph: !showAddExercise })}
          >
            <span> Progress </span>
            <ImageContainer>
              <img src={arrow} alt="" />
            </ImageContainer>
          </GenericContainer>
          {showGraph ? <Graph /> : null}
          <GenericContainer>
            <span> Workout Calendar </span>
            <ImageContainer>
              <img src={arrow} alt="" />
            </ImageContainer>
          </GenericContainer>
          <div> 22kg </div>
        </SearchResult>
      </Container>
    )
  }
}

const mapStateToProps = ({ exerciseData }) => ({
  exerciseData,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addExerciseToCurrentWorkout },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchedExercise)
