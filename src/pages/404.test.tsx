import React from 'react'
import { render } from '@testing-library/react'
import gatsbyMock from '../lib/mocks/gatsby'
import NotFoundPage from './404'

jest.mock('gatsby', () => gatsbyMock)

describe('The IndexPage component', () => {
  it('should render the expected title', async () => {
    const { getByText } = render(<NotFoundPage />)

    expect(getByText('Page Not Found')).not.toBeNull()
  })
})
