import React, { Component } from 'react'
import styled from 'styled-components'

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
  border: 1px solid black;
  margin: 5px;
  width: 40%;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Main extends Component {
  render() {
    return (
      <Container>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
      </Container>
    )
  }
}

export default Main
