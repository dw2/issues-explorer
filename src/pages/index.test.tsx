import React from 'react'
import { Provider } from 'mobx-react'
import { render } from '@testing-library/react'
import gatsbyMock from '../lib/mocks/gatsby'
import mockIssues from '../lib/mocks/issues'
import IssuesStore from '../stores/issues-store'
import IndexPage from './'

jest.mock('gatsby', () => gatsbyMock)

describe('The IndexPage component', () => {
  it('should render the expected content', async () => {
    const issuesStore = new IssuesStore()
    issuesStore.issuesCache.set('test', { issues: mockIssues, issueCount: 20 })
    issuesStore.setRecentSearch('test')
    const { getByText, getByPlaceholderText } = render(
      <Provider issues={issuesStore}>
        <IndexPage />
      </Provider>
    )

    expect(getByPlaceholderText('Search...')).not.toBeNull()
    expect(getByText(mockIssues[0].title)).not.toBeNull()
  })
})
