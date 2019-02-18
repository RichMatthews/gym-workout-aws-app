import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #3d9e7b;
  border-radius: 4px;
`

export const Button = ({ type, text, onClick, className }) => (
  <StyledButton type={type} className={className} onClick={onClick}>
    {text}
  </StyledButton>
)
