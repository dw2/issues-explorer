import React from 'react'
import styled from 'styled-components'
import { rem } from 'styled-tidy'
import theme from '../../lib/styles/theme'

interface WrapperProps {
  size: number
}

interface Props {
  fill?: string
  size?: number
}

export const SpinnerWrapper = styled.span.attrs(({ size }: WrapperProps) => ({
  style: { width: rem(size), height: rem(size) },
}))<WrapperProps>`
  display: inline-block;
`

export default ({ fill = theme.colors.white, size = 24 }: Props) => (
  <SpinnerWrapper size={size}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="100%"
      height="100%"
      viewBox="0 0 50 50"
      fill={fill}
      aria-label="Loading"
    >
      <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </SpinnerWrapper>
)
