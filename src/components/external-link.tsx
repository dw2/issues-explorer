import React from 'react'

interface Props {
  children: React.ReactNode
  href: string
  onKeyUp?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void
}

export default ({ children, href, onKeyUp }: Props) => (
  <a
    href={href}
    onKeyUp={onKeyUp}
    rel="noopener noreferrer"
    target="_blank"
    role="button"
    tabIndex={0}
  >
    {children}
  </a>
)
