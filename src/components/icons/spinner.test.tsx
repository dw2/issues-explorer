import React from 'react'
import { render } from '@testing-library/react'
import Spinner from './spinner'

describe('The Spinner icon component', () => {
  it('should use the default size and fill color', () => {
    const { getByLabelText } = render(<Spinner />)
    const svg = getByLabelText('Loading')

    expect(svg.parentElement.getAttribute('style')).toEqual(
      'width: 1.5rem; height: 1.5rem;'
    )
    expect(svg.getAttribute('fill')).toBe('#FFFFFF')
  })

  it('should use the given size and fill color', () => {
    const { getByLabelText } = render(<Spinner size={48} fill="blue" />)
    const svg = getByLabelText('Loading')

    expect(svg.parentElement.getAttribute('style')).toEqual(
      'width: 3rem; height: 3rem;'
    )
    expect(svg.getAttribute('fill')).toBe('blue')
  })
})
