import {
  resetExerciseSearch,
  searchForExercise,
} from 'redux/action-creators/exercises'

import { Button } from 'components/shared/button'
import Graph from 'components/graph'
import React from 'react'
import { StyledSelect } from 'components/workout'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { toggleModal } from 'redux/action-creators/modal'

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
  background: #000;
  padding: 3px;
  margin-bottom: 10px;
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

class Search extends React.Component {
  state = {
    searchTerm: '',
  }

  handleChange(value) {
    this.setState({ searchTerm: value })
  }

  render() {
    let renderSearchResult
    if (this.props.exerciseData.current.previousWeights) {
      renderSearchResult = (
        <SearchResult>
          <div> Exercise {this.props.exerciseData.current.name} </div>
          <div>
            Last weight lifted{' '}
            {this.props.exerciseData.current.lastWeightLifted}kg
            <Graph currentExercise={this.props.exerciseData.current} />
          </div>
        </SearchResult>
      )
    } else {
      renderSearchResult = (
        <NoSearchResult>
          You have no previous records for this weight
        </NoSearchResult>
      )
    }

    return (
      <Container>
        <SearchContainer>
          <StyledSelect
            options={this.props.exercises}
            placeholder="search for an exercise"
            onChange={value => this.handleChange(value)}
          />
        </SearchContainer>
        <Button
          text="search..."
          onClick={() => this.props.searchForExercise(this.state.searchTerm)}
        />
        {this.props.exerciseData.searched ? (
          <div>
            {renderSearchResult}
            <button onClick={() => this.props.resetExerciseSearch()}>Clear</button>
            <button onClick={() => this.props.toggleModal()}>Add to workout</button>
          </div>
        ) : null}
      </Container>
    )
  }
}

const mapStateToProps = ({ exerciseData }) => ({
  exerciseData,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ searchForExercise, resetExerciseSearch, toggleModal }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
