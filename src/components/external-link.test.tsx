import React from 'react'
import { render } from '@testing-library/react'
import ExternalLink from './external-link'

describe('The ExternalLink component', () => {
  it('should wrap children with an anchor tag that includes rel and target attributes', () => {
    const { getByText } = render(
      <ExternalLink href="http://google.com">Google</ExternalLink>
    )
    const link = getByText('Google')

    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    expect(link.getAttribute('target')).toBe('_blank')
  })
})
