import React from 'react'
import { render } from '@testing-library/react'
import gatsbyMock from '../lib/mocks/gatsby'
import IndexPage from './'

jest.mock('gatsby', () => gatsbyMock)

describe('The IndexPage component', () => {
  it('should render the expected conent', async () => {
    const { getByText } = render(<IndexPage />)

    expect(getByText('Main Page')).not.toBeNull()
    expect(getByText('Hello World')).not.toBeNull()
  })
})
