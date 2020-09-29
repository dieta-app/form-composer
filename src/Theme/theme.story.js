import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import theme from './theme'

const Wrapper = styled.div`
  padding: 10px;
`

const ColorBlock = styled.div`
  display: inline-block;
  margin-left: 5px;
  margin-bottom: 5px;
  border: 1px solid black;
  height: 120px;
  width: 100px;
  background-color: ${props => props.theme.colors[props.color]};
  div {
    text-align: center;
    color: black;
    background-color: white;
    border-bottom: 1px solid gray;
  }
`

const TextBlock = styled.div`
  font-size: ${props => props.size};
  font-weight: ${props => (props.bold ? props.theme.fontWeights.bold : props.theme.fontWeights.regular)};
  margin-bottom: 5px;
`

const sampleText = 'This is a text sample'
const TextValues = [
  { text: sampleText, size: '10px' },
  { text: sampleText, size: '12px' },
  { text: sampleText, size: '14px' },
  { text: sampleText, size: '16px' },
  { text: sampleText, size: '20px' },
  { text: sampleText, size: '32px' },
  { text: sampleText, size: '48px' }
]

storiesOf('Theme', module).add('Styles', () => (
  <Wrapper>
    <h1>Colors</h1>
    {Object.entries(theme.colors).map(([key, value]) => (
      <ColorBlock key={key} color={key}>
        <div>{key}</div>
        <div>{value}</div>
      </ColorBlock>
    ))}
    <h1>Typo</h1>
    {TextValues.map(value => (
      <TextBlock key={`reg_$${value.text}_${value.size}`} size={value.size}>
        {value.text} ({value.size} regular)
      </TextBlock>
    ))}
    <br />
    {TextValues.map(value => (
      <TextBlock key={`bold_${value.text}_${value.size}`} size={value.size} bold>
        {value.text} ({value.size} bold)
      </TextBlock>
    ))}
  </Wrapper>
))