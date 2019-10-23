import React from 'react'
import { render, act, fireEvent, wait } from '@testing-library/react'
import IssuesStore from '../stores/issues-store'
import mockIssues from '../lib/mocks/issues'
import SearchBox from './search-box'

jest.mock('lodash.debounce', () => func => func)

describe('The SearchBox component', () => {
  it('fetches issues when the input field changes', async () => {
    const issuesStore = new IssuesStore()
    jest.spyOn(issuesStore, 'getIssues').mockResolvedValue()
    const { getByPlaceholderText } = render(
      <SearchBox inputRef={null} listRef={null} issues={issuesStore} />
    )
    const input = getByPlaceholderText('Search...')

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } })
    })
    await wait(() => {
      expect(issuesStore.getIssues).toHaveBeenCalledWith('test')
    })
  })

  it('renders the issue count with total when there are more results than show', () => {
    const issuesStore = new IssuesStore()
    issuesStore.issuesCache.set('test', { issues: mockIssues, count: 777 })
    issuesStore.setRecentSearch('test')
    const { getByText } = render(
      <SearchBox inputRef={null} listRef={null} issues={issuesStore} />
    )

    expect(getByText('3 of 777')).not.toBeNull()
  })

  it('renders the issue count alone when all results are shown', () => {
    const issuesStore = new IssuesStore()
    issuesStore.issuesCache.set('test', { issues: mockIssues, count: 3 })
    issuesStore.setRecentSearch('test')
    const { getByText } = render(
      <SearchBox inputRef={null} listRef={null} issues={issuesStore} />
    )

    expect(getByText('3')).not.toBeNull()
  })

  it('renders the error from the issues store when present', () => {
    const issuesStore = new IssuesStore()
    issuesStore.setError(new Error('Uh oh'))
    const { getByText } = render(
      <SearchBox inputRef={null} listRef={null} issues={issuesStore} />
    )

    expect(getByText('Uh oh')).not.toBeNull()
  })

  it('selects the first issue when the down key is pressed', async () => {
    const issuesStore = new IssuesStore()
    const focus = jest.fn()
    const mockListRef: any = {
      current: {
        querySelector: () => ({ focus }),
      },
    }
    issuesStore.issuesCache.set('test', { issues: mockIssues, count: 777 })
    issuesStore.setRecentSearch('test')
    const { getByPlaceholderText } = render(
      <SearchBox inputRef={null} listRef={mockListRef} issues={issuesStore} />
    )
    const input = getByPlaceholderText('Search...')

    act(() => {
      fireEvent.keyUp(input, { key: 'ArrowDown' })
    })
    await wait(() => {
      expect(focus).toHaveBeenCalled()
    })
  })

  it('does nothing when the down key is pressed and there are no issues', async () => {
    const issuesStore = new IssuesStore()
    const mockListRef: any = {
      current: {
        querySelector: () => undefined,
      },
    }
    issuesStore.setRecentSearch('derp')
    const { container, getByPlaceholderText } = render(
      <SearchBox inputRef={null} listRef={mockListRef} issues={issuesStore} />
    )
    const input = getByPlaceholderText('Search...')

    act(() => {
      container.querySelector('input').focus()
      fireEvent.keyUp(input, { key: 'ArrowDown' })
    })
    await wait(() => {
      expect(document.activeElement).toEqual(input)
    })
  })

  it('does nothing when the up key is pressed', async () => {
    const issuesStore = new IssuesStore()
    const { container, getByPlaceholderText } = render(
      <SearchBox inputRef={null} listRef={null} issues={issuesStore} />
    )
    const input = getByPlaceholderText('Search...')

    act(() => {
      container.querySelector('input').focus()
      fireEvent.keyUp(input, { key: 'ArrowUp' })
    })
    await wait(() => {
      expect(document.activeElement).toEqual(input)
    })
  })
})
