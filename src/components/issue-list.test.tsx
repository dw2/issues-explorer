import React from 'react'
import { render, act, fireEvent, wait } from '@testing-library/react'
import IssuesStore from '../stores/issues-store'
import mockIssues from '../lib/mocks/issues'
import IssueList from './issue-list'

describe('The IssueList component', () => {
  it('renders null when there are no issues', async () => {
    const issuesStore = new IssuesStore()
    const { container } = render(
      <IssueList inputRef={null} listRef={null} issues={issuesStore} />
    )

    expect(container.innerHTML).toBe('')
  })

  it('renders the stored issues', async () => {
    const issuesStore = new IssuesStore()
    issuesStore.issuesCache.set('test', { issues: mockIssues, count: 777 })
    issuesStore.setRecentSearch('test')
    const { getByText } = render(
      <IssueList inputRef={null} listRef={null} issues={issuesStore} />
    )

    expect(getByText('Test issue')).not.toBeNull()
    expect(getByText('bug')).not.toBeNull()
  })

  it('selects the next issue when the down key is pressed', async () => {
    const issuesStore = new IssuesStore()
    issuesStore.issuesCache.set('test', { issues: mockIssues, count: 777 })
    issuesStore.setRecentSearch('test')
    const { container } = render(
      <IssueList inputRef={null} listRef={null} issues={issuesStore} />
    )
    const links = container.querySelectorAll('a')

    jest.spyOn(links[1], 'focus')
    act(() => {
      fireEvent.keyUp(links[0], { key: 'ArrowDown' })
    })
    await wait(() => {
      expect(links[1].focus).toHaveBeenCalled()
    })
  })

  it('does nothing when the down key is pressed on the last issue', async () => {
    const issuesStore = new IssuesStore()
    issuesStore.issuesCache.set('test', { issues: mockIssues, count: 777 })
    issuesStore.setRecentSearch('test')
    const { container } = render(
      <IssueList inputRef={null} listRef={null} issues={issuesStore} />
    )
    const links = container.querySelectorAll('a')

    jest.spyOn(links[0], 'focus')
    jest.spyOn(links[1], 'focus')
    act(() => {
      fireEvent.keyUp(links[2], { key: 'ArrowDown' })
    })
    await wait(() => {
      expect(links[0].focus).not.toHaveBeenCalled()
      expect(links[1].focus).not.toHaveBeenCalled()
    })
  })

  it('selects the previous issue when the up key is pressed', async () => {
    const issuesStore = new IssuesStore()
    issuesStore.issuesCache.set('test', { issues: mockIssues, count: 777 })
    issuesStore.setRecentSearch('test')
    const { container } = render(
      <IssueList inputRef={null} listRef={null} issues={issuesStore} />
    )
    const links = container.querySelectorAll('a')

    jest.spyOn(links[0], 'focus')
    act(() => {
      fireEvent.keyUp(links[1], { key: 'ArrowUp' })
    })
    await wait(() => {
      expect(links[0].focus).toHaveBeenCalled()
    })
  })

  it('focuses on the search input field when the up key is pressed on the first issue', async () => {
    const issuesStore = new IssuesStore()
    const mockInputRef: any = { current: { focus: jest.fn() } }
    issuesStore.issuesCache.set('test', { issues: mockIssues, count: 777 })
    issuesStore.setRecentSearch('test')
    const { container } = render(
      <IssueList inputRef={mockInputRef} listRef={null} issues={issuesStore} />
    )
    const links = container.querySelectorAll('a')

    jest.spyOn(links[0], 'focus')
    act(() => {
      fireEvent.keyUp(links[0], { key: 'ArrowUp' })
    })
    await wait(() => {
      expect(mockInputRef.current.focus).toHaveBeenCalled()
    })
  })
})
