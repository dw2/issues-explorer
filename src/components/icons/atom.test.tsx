import React from 'react'
import { render } from '@testing-library/react'
import Atom from './atom'

describe('The Atom icon component', () => {
  it('should use the default size and fill color', () => {
    const { getByLabelText } = render(<Atom />)
    const svg = getByLabelText('React Logo')

    expect(svg.getAttribute('width')).toBe('24px')
    expect(svg.getAttribute('height')).toBe('24px')
    expect(svg.getAttribute('fill')).toBe('#FFFFFF')
  })

  it('should use the given size and fill color', () => {
    const { getByLabelText } = render(<Atom size={48} fill="blue" />)
    const svg = getByLabelText('React Logo')

    expect(svg.getAttribute('width')).toBe('48px')
    expect(svg.getAttribute('height')).toBe('48px')
    expect(svg.getAttribute('fill')).toBe('blue')
  })
})
