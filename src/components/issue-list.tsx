import React from 'react'
import { inject, observer } from 'mobx-react'
import styled, { css } from 'styled-components'
import { rem, flex, grid, value } from 'styled-tidy'
import theme from '../lib/styles/theme'
import IssuesStore from '../stores/issues-store'
import ExternalLink from './external-link'
import TimeAgo from './time-ago'

const {
  white,
  black,
  lightBlue,
  darkBlue,
  mediumBlue,
  blue,
  lime,
} = theme.colors

const List = styled.ol`
  background: ${darkBlue};
  box-shadow: 0 0 0 ${rem(2)} ${darkBlue};
  border-radius: 0 0 ${rem(8)} ${rem(8)};
  list-style: none;
  margin: 0;
  max-width: ${rem(600)};
  padding: ${rem(8)} ${rem(2)} ${rem(2)};
  user-select: none;
  width: 100%;
`

const Issue = styled.li`
  @keyframes issueFadeIn {
    0% {
      opacity: 0;
      transform: scaleX(0.8);
    }
    50% {
      transform: scaleX(1.02);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  ${[...Array(10)].map(
    (_, idx) => css`
      :nth-child(${idx}) a {
        animation-delay: ${idx * 50}ms;
      }
    `
  )}

  & + & {
    margin-top: ${rem(2)};
  }

  h3 {
    ${flex('row', 'flex-start', 'space-between')}

    time {
      font-size: ${rem(12)};
      text-align: right;
      margin-left: ${rem(16)};
      white-space: nowrap;
    }
  }

  p {
    ${grid(6, 4)}
    grid-template-columns: repeat(auto, 1fr);
    margin-top: ${rem(8)};
    opacity: 0.9;
    transition: opacity 250ms ease;
  }

  a {
    animation: issueFadeIn 400ms ease forwards;
    background: ${mediumBlue};
    border-radius: ${rem(6)};
    color: ${lightBlue};
    display: block;
    font-size: ${rem(114)};
    padding: ${rem(16)};
    position: relative;
    transition: all 400ms ease;

    :hover,
    :focus {
      background: ${blue};
      color: ${white};

      p {
        opacity: 1;
      }
    }

    :focus {
      box-shadow: 0 0 0 ${rem(2)} ${darkBlue}, 0 0 0 ${rem(4)} ${lime};
      z-index: 2;
    }
  }
`

const Tag = styled.mark<{ hex: string }>`
  background: #${value('hex')};
  color: ${black};
  border-radius: ${rem(4)};
  font-size: ${rem(12)};
  line-height: ${rem(20)};
  padding: 0 ${rem(4)};
  white-space: nowrap;
`

interface Props {
  issues?: IssuesStore
  inputRef: React.RefObject<HTMLInputElement>
  listRef: React.RefObject<HTMLOListElement>
}

const IssueList = ({ issues: issuesStore, inputRef, listRef }: Props) => {
  const { issues } = issuesStore

  const handleKeyUp = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === 'ArrowDown') {
      const next: any = event.currentTarget.parentNode.nextSibling
      if (next) {
        window.requestAnimationFrame(() => next.querySelector('a').focus())
      }
    }
    if (event.key === 'ArrowUp') {
      const prev: any = event.currentTarget.parentNode.previousSibling
      if (prev) {
        window.requestAnimationFrame(() => prev.querySelector('a').focus())
      } else {
        inputRef.current.focus()
      }
    }
  }

  if (issues.length < 1) return null
  return (
    <List ref={listRef}>
      {issues.map(({ title, url, createdAt, labels }) => (
        <Issue key={url}>
          <ExternalLink href={url} onKeyUp={handleKeyUp}>
            <h3>
              {title}
              <TimeAgo date={createdAt} />
            </h3>
            {labels.length > 0 && (
              <p>
                {labels.map(({ name, color }) => (
                  <Tag key={name} hex={color}>
                    {name}
                  </Tag>
                ))}
              </p>
            )}
          </ExternalLink>
        </Issue>
      ))}
    </List>
  )
}

export default inject('issues')(observer(IssueList))
