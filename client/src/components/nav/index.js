import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import account from './account.svg'
import search from './search.svg'
import currentWorkout from './current-workout.svg'

const Container = styled.div`
  bottom: 0;
  background-color: #e6e3e0;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  padding-bottom: 1px;
  position: fixed;
  width: 98%;
`

const ImageContainer = styled.div`
  object-fit: contain;
  width: 20px;
  height: 20px;
`

const IconContainer = styled.div``

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const StyledLink = styled(Link)`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`

export const Nav = () => (
  <Container>
    <IconContainer>
      <StyledLink to={'/current'}>
        <ImageContainer>
          <Image src={currentWorkout} />
        </ImageContainer>
        Current workout
      </StyledLink>
    </IconContainer>
    <IconContainer>
      <StyledLink to={'/search'}>
        <ImageContainer>
          <Image src={search} />
        </ImageContainer>
        search
      </StyledLink>
    </IconContainer>
    <IconContainer>
      <StyledLink to={'/account'}>
        <ImageContainer>
          <Image src={account} />
        </ImageContainer>
        account
      </StyledLink>
    </IconContainer>
    <IconContainer>
      <StyledLink to={'/'}>
        <ImageContainer>
          <Image src={account} />
        </ImageContainer>
        home
      </StyledLink>
    </IconContainer>
  </Container>
)
