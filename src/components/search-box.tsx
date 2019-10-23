import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import { rem, flex, position } from 'styled-tidy'
import theme from '../lib/styles/theme'
import IssuesStore from '../stores/issues-store'
import Spinner, { SpinnerWrapper } from './icons/spinner'

const { colors, fonts } = theme
const { white, mediumBlue, darkBlue, lime, red, lavender } = colors

const Form = styled.form`
  ${flex('column', 'center', 'flex-start')}
  max-width: ${rem(600)};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 4;

  ${SpinnerWrapper} {
    ${position('absolute', 'auto', 12, 14, 'auto')}
  }
`

const Label = styled.label`
  font-family: ${fonts.accent};
  font-size: ${rem(14)};
  letter-spacing: ${rem(1)};
  padding: ${rem(16)};
  text-align: center;
  text-transform: uppercase;
  user-select: none;
`

const Input = styled.input`
  background: ${white};
  box-shadow: 0 0 0 ${rem(2)} ${darkBlue}, 0 0 0 ${rem(4)} ${mediumBlue};
  border-radius: ${rem(8)};
  display: block;
  font-family: ${fonts.accent};
  font-size: ${rem(20)};
  padding: ${rem(12)};
  transition: box-shadow 250ms ease;
  width: 100%;

  :focus {
    box-shadow: 0 0 0 ${rem(2)} ${darkBlue}, 0 0 0 ${rem(4)} ${lime};
  }
`

const Count = styled.var`
  @keyframes countFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  ${position('absolute', 'auto', 4, 14, 'auto')}
  animation: countFadeIn 600ms ease forwards;
  background: ${red};
  border-radius: ${rem(6)};
  color: ${white};
  font-size: ${rem(14)};
  line-height: ${rem(20)};
  padding: 0 ${rem(8)};
  transform: translateY(-50%);
  user-select: none;
`

const Error = styled.mark`
  background: ${red};
  border-radius: ${rem(8)};
  color: ${white};
  margin: ${rem(16)} auto;
  padding: ${rem(16)};
  width: 100%;
`

interface Props {
  issues?: IssuesStore
  inputRef: React.RefObject<HTMLInputElement>
  listRef: React.RefObject<HTMLOListElement>
}

const SearchBox = ({ issues: issuesStore, inputRef, listRef }: Props) => {
  const { issueCount, issues, recentSearch, error } = issuesStore
  const [isFetching, setIsFetching] = useState(false)

  const findIssues = debounce((term: string) => {
    issuesStore.setRecentSearch('')
    setIsFetching(true)
    window.requestAnimationFrame(async () => {
      await issuesStore.getIssues(term)
      setIsFetching(false)
    })
  }, 300)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.trim()
    findIssues(search)
  }

  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && listRef.current) {
      const link = listRef.current.querySelector('a')
      if (!link) return
      window.requestAnimationFrame(() => link.focus())
    }
  }

  return (
    <>
      <Form autoComplete="off">
        <Label htmlFor="search">Search Open Github Isssues</Label>
        <Input
          id="search"
          name="search"
          placeholder="Search..."
          ref={inputRef}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyUp}
          defaultValue={recentSearch}
        />
        {issueCount > 0 && (
          <Count>
            {issueCount > issues.length
              ? `${issues.length} of ${issueCount}`
              : issueCount}
          </Count>
        )}
        {isFetching && <Spinner size={24} fill={lavender} />}
      </Form>
      {error && <Error>{error.message}</Error>}
    </>
  )
}

export default inject('issues')(observer(SearchBox))
