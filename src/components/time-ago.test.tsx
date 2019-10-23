import React from 'react'
import { render } from '@testing-library/react'
import TimeAgo from './time-ago'

describe('The TimeAgo component', () => {
  it('renders a given date in the "time ago" format', async () => {
    const yesterday = new Date(new Date().valueOf() - 86400000).toISOString()
    const { getByText } = render(<TimeAgo date={yesterday} />)

    expect(getByText('a day ago')).not.toBeNull()
  })
})
