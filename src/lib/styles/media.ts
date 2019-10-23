import { minWidth } from 'styled-tidy'

export const sizes = {
  xsmall: 400,
  small: 640,
  medium: 832,
  large: 1024,
  xlarge: 1200,
}

const media = {}

Object.keys(sizes).forEach(size => {
  media[size] = minWidth(sizes[size])
})

export default media
