import React from 'react'
import { render } from '@testing-library/react'
import Header from './header'

describe('The Header component', () => {
  it('renders the expected content', async () => {
    const { getByText } = render(<Header />)

    expect(getByText('Issues Explorer')).not.toBeNull()
  })
})
