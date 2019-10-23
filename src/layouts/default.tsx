import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../lib/styles/global'
import theme from '../lib/styles/theme'
import Head from '../components/head'
import Header from '../components/header'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head />
        <GlobalStyle />
        <Header />
        <main>{children}</main>
      </>
    </ThemeProvider>
  )
}

export default Layout
