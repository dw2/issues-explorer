import React from 'react'
import styled from 'styled-components'
import { rem, flex, minWidth } from 'styled-tidy'
import theme from '../lib/styles/theme'
import Atom from './icons/atom'

const { colors, fonts } = theme
const { lavender } = colors

const Title = styled.h1`
  ${flex('row', 'center', 'center')}
  color: ${lavender};
  font-size: 10vw;
  line-height: 1;
  padding: ${rem(32)} ${rem(16)} ${rem(16)};
  position: relative;
  text-align: center;
  user-select: none;
  z-index: 4;

  svg {
    margin: 0 ${rem(8)} 0 0;
  }

  ${minWidth(400)`
    font-size: ${rem(40)};
    font-family: ${fonts.accent};
    padding: ${rem(32)};
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
