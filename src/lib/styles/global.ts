import { createGlobalStyle } from 'styled-components'
import theme from './theme'

const { colors, fonts } = theme
const { white, darkBlue, lavender } = colors

export default createGlobalStyle`
  * {
    background: transparent;
    border: 0;
    border-radius: 0;
    box-sizing: border-box;
    font-family: ${fonts.base};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin: 0;
    outline: none;
    padding: 0;
    text-decoration: none;
  }
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  html,
  body {
    min-height: 100%;
  }
  body {
    background: ${darkBlue};
    color: ${white};
    font-weight: 400;
    margin: 0;
  }
  a, a *, button, button *, label {
    cursor: pointer;
  }
  ::selection {
    background: ${lavender};
    color: ${white};
  }
`
