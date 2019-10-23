import IssuesStore from './issues-store'

describe('The IssuesStore class', () => {
  it('should hydrate the issues observable', async () => {
    const store = new IssuesStore()
    const issue = { title: 'Test', labels: ['bug', 'hotfix'] }

    store.setIssues([issue])
    expect(store.dehydrate()).toEqual({ issues: [issue] })
  })
})
