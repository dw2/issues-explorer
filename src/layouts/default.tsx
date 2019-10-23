import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { rem, flex, position, minWidth } from 'styled-tidy'
import GlobalStyle from '../lib/styles/global'
import theme from '../lib/styles/theme'
import Head from '../components/head'
import Header from '../components/header'

const { midBlue, darkBlue } = theme.colors

const Wrapper = styled.div`
  ${position('fixed', 0)}
  background: linear-gradient(${midBlue}, ${darkBlue});
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const Main = styled.main`
  ${flex('column', 'center', 'flex-start')}
  padding: 0 ${rem(16)} ${rem(64)};
  width: 100%;

  :before {
    ${position('fixed', 0, 0, 'auto')}
    box-shadow: 0 0 25vh 50vh ${darkBlue};
    content: '';
  }

  :after {
    ${position('fixed', 0, 0, 'auto')}
    box-shadow: 0 0 ${rem(32)} ${rem(96)} ${darkBlue};
    content: '';
    z-index: 3;
  }

  ${minWidth(400)`
    padding: 0 ${rem(32)} ${rem(64)};
  `}
`

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head />
        <GlobalStyle />
        <Wrapper>
          <Header />
          <Main>{children}</Main>
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout
