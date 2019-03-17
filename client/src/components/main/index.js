import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
  margin-top: 100px;
  width: 80%;
  flex-wrap: wrap;
  text-align: center;
`

const Item = styled.div`
  border: 1px solid transparent;
  border-radius: 5px;
  margin: 5px;
  width: 40%;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Search = styled(Item)`
  background: #383b3f;
`

const NewWorkout = styled(Item)`
  background: #383b3f;
`

const PreviousWorkout = styled(Item)`
  background: #383b3f;
`

const CurrentWorkout = styled(Item)`
  background: #383b3f;
`

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
  font-size: 30px;
`

class Main extends Component {
  render() {
    return (
      <Container>
        <Search>
          <StyledLink to={'/search'}>Search </StyledLink>
        </Search>
        <NewWorkout>
          <StyledLink to={'/search'}> New Workout </StyledLink>{' '}
        </NewWorkout>
        <PreviousWorkout>
          <StyledLink to={'/search'}> Previous Workouts </StyledLink>{' '}
        </PreviousWorkout>
        <CurrentWorkout>
          <StyledLink to={'/search'}> Current Workout </StyledLink>{' '}
        </CurrentWorkout>
        <CurrentWorkout>
          <StyledLink to={'/search'}> Progress </StyledLink>{' '}
        </CurrentWorkout>
        <CurrentWorkout>
          <StyledLink to={'/search'}> Help </StyledLink>{' '}
        </CurrentWorkout>
      </Container>
    )
  }
}

export default Main
