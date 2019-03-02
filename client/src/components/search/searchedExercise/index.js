import React from 'react'
import styled from 'styled-components'

import Graph from 'components/graph'
import { toggleModal } from 'redux/action-creators/modal'
import { addExerciseToCurrentWorkout } from 'redux/action-creators/exercises'
import { AddExercise } from '../addExercise'
import { Button } from 'components/shared/button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: #000;
`

const SearchContainer = styled.div`
  width: 100%;
`

const SearchResult = styled.div`
  font-size: 18px;
`

const NoSearchResult = styled.div`
  padding: 10px;
`

const ExerciseName = styled.h3`
  background: #2b2b29;
  padding: 5px;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
`

const LastLifted = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  width: 100px;
  text-align: center;
`

const LastLiftedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  background: #2b2b29;
  margin: 1rem;
  border-radius: 15px;
`

const LastLiftedAmount = styled.div`
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: 30px;
  padding: 5px;
  margin-bottom: 0.5rem;
`
const LastLiftedLabel = styled.p`
  margin: 0;
  font-size: 12px;
`

const GenericContainer = styled.div`
  border-radius: 10px;
  margin: 1rem;
  padding: 5px;
  background: #2b2b29;
`

const GenericButton = styled.button`
  width: 100%;
  padding: 5px;
  margin: 2px;
  border-radius: 5px;
  border: none;
`
const AddExerciseButton = styled(GenericButton)`
  background: green;
`

const SearchAgainButton = styled(GenericButton)`
  background: red;
`

export class SearchedExercise extends React.Component {
  state = {
    addExercise: false,
  }

  render() {
    let renderSearchResult
    const {
      exerciseData,
      addExerciseToCurrentWorkout,
      resetExerciseSearch,
    } = this.props
    if (exerciseData.current.previousWeights) {
      renderSearchResult = (
        <SearchResult>
          <ExerciseName> {exerciseData.current.name} </ExerciseName>
          <GenericContainer>
            <LastLiftedContainer>
              <LastLifted>
                <LastLiftedAmount>
                  {' '}
                  {exerciseData.current.lastWeightLifted}kg{' '}
                </LastLiftedAmount>
                <LastLiftedLabel> Last lifted weight </LastLiftedLabel>
              </LastLifted>
              <LastLifted>
                <LastLiftedAmount> 11/02 </LastLiftedAmount>
                <LastLiftedLabel> Last lifted date </LastLiftedLabel>
              </LastLifted>
            </LastLiftedContainer>
          </GenericContainer>
          <GenericContainer>
            <Graph currentExercise={exerciseData.current} />
          </GenericContainer>
          <GenericContainer>
            {this.state.addExercise ? (
              <AddExercise
                addExerciseToCurrentWorkout={addExerciseToCurrentWorkout}
                exerciseData={exerciseData}
                cancelAddingWorkout={() =>
                  this.setState({ addExercise: false })
                }
              />
            ) : (
              <div>
                <AddExerciseButton
                  onClick={() => this.setState({ addExercise: true })}
                >
                  add exercise
                </AddExerciseButton>
                <SearchAgainButton onClick={() => resetExerciseSearch()}>
                  search again
                </SearchAgainButton>
              </div>
            )}
          </GenericContainer>
        </SearchResult>
      )
    } else {
      renderSearchResult = (
        <NoSearchResult>
          You have no previous records for this weight
        </NoSearchResult>
      )
    }
    return <Container> {renderSearchResult} </Container>
  }
}
