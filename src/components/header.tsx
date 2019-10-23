import React from 'react'
import styled from 'styled-components'
import { rem, flex, minWidth } from 'styled-tidy'
import theme from '../lib/styles/theme'
import Atom from './icons/atom'

const { lavender } = theme.colors

const Title = styled.h1`
  ${flex('column-reverse', 'center', 'center')}
  color: ${lavender};
  line-height: 1;
  padding: ${rem(32)};
  position: relative;
  text-align: center;
  user-select: none;
  z-index: 4;

  svg {
    margin: ${rem(8)} 0 0;
  }

  ${minWidth(400)`
    flex-direction: row;

    svg {
      margin: 0 ${rem(8)} 0 0;
    }
  `}
`

const Header = () => (
  <header>
    <Title>
      <Atom fill={lavender} size={32} />
      Issues Explorer
    </Title>
  </header>
)

export default Header
