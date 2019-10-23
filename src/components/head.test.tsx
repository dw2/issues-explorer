import React from 'react'
import { render, wait } from '@testing-library/react'
import gatsbyMock from '../lib/mocks/gatsby'
import Head from './head'

jest.mock('gatsby', () => gatsbyMock)

describe('The Head component', () => {
  it('should set the title tag with the default title', async () => {
    render(<Head />)

    await wait(() => {
      expect(document.title).toEqual('Github Issues Explorer')
    })
  })

  it('should set the title tag with the given title', async () => {
    render(<Head title="Title" />)

    await wait(() => {
      expect(document.title).toEqual('Title | Github Issues Explorer')
    })
  })
})
