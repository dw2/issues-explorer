import { createGlobalStyle } from 'styled-components'
import theme from './theme'

const { colors, fonts } = theme
const { white, black } = colors

export default createGlobalStyle`
  * {
    border: 0;
    border-radius: 0;
    box-sizing: border-box;
    font-family: ${fonts.base};
    margin: 0;
    outline: none;
    padding: 0;
    text-decoration: none;
  }
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    background: ${white};
    color: ${black};
    font-weight: 400;
    margin: 0;
  }
  a, a *, button, button * {
    cursor: pointer;
  }
  h1, h2, h3 {
    font-family: ${fonts.accent};
  }
`
