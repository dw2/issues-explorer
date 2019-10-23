import React from 'react'

interface Props {
  children: React.ReactNode
  href: string
}

export default ({ children, href, ...rest }: Props) => (
  <a href={href} rel="noopener noreferrer" target="_blank" {...rest}>
    {children}
  </a>
)
