import { observable } from 'mobx'
import mockIssues from '../lib/mocks/issues'
import localStorageMock from '../lib/mocks/local-storage'
import IssuesStore from './issues-store'

jest.mock('axios')

Object.defineProperty(window, 'localStorage', {
  value: null,
  writable: true,
})

const cachedSearch = { issues: mockIssues, count: 20 }

const successData = {
  data: {
    data: {
      search: {
        issueCount: 20,
        edges: [
          ...mockIssues.map(issue => ({
            node: {
              ...issue,
              labels: issue.labels.length
                ? {
                    edges: issue.labels.map(label => ({
                      node: label,
                    })),
                  }
                : null,
            },
          })),
        ],
      },
    },
  },
}

const setupStore = (withLocalStorage: boolean = true) => {
  if (withLocalStorage) {
    ;(window as any).localStorage = localStorageMock
    window.localStorage.setItem(
      'explorer.issues',
      JSON.stringify({
        issues: { test: cachedSearch },
        recentSearch: 'test',
      })
    )
  }
  const store = new IssuesStore()
  return store
}

describe('The IssuesStore class', () => {
  let originalLocalStorage

  beforeAll(() => {
    originalLocalStorage = window.localStorage
  })

  afterAll(() => {
    ;(window as any).localStorage = originalLocalStorage
  })

  it('should hydrate values from local storage', async () => {
    const store = setupStore()
    expect(store.recentSearch).toBe('test')
    expect(store.issuesCache.get('test')).toEqual(cachedSearch)
  })

  it('should not hydrate values from local storage when the key is empty', async () => {
    ;(window as any).localStorage = localStorageMock
    window.localStorage.setItem('explorer.issues', '{}')
    const store = setupStore(false)
    expect(store.recentSearch).toBe('')
    expect(store.issuesCache.get('test')).not.toBeDefined()
  })

  it('should not hydrate values from local storage when localStorage is undefined', async () => {
    ;(window as any).localStorage = null
    const store = setupStore(false)
    expect(store.recentSearch).toBe('')
    expect(store.issuesCache.get('test')).not.toBeDefined()
  })

  it('should dehydrate the issues observable', async () => {
    const store = setupStore()
    expect(store.dehydrate()).toEqual({
      issuesCache: observable.map({ test: cachedSearch }),
      recentSearch: 'test',
    })
  })

  describe('getIssues', () => {
    let axios

    beforeAll(() => {
      axios = require('axios')
      jest.spyOn(axios, 'post').mockResolvedValue({})
    })

    afterEach(() => {
      axios.post.mockClear()
    })

    it('should fetch data from the Github API', async () => {
      const store = setupStore()
      await store.getIssues('bug')
      expect(axios.post).toHaveBeenCalledWith(
        'https://api.github.com/graphql',
        {
          query: expect.anything(),
          variables: expect.anything(),
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer undefined',
            'Content-Type': 'application/json',
          },
        }
      )
    })

    it('should cache a successful response', async () => {
      const store = setupStore()
      axios.post.mockReset()
      axios.post.mockResolvedValue(successData)
      await store.getIssues('bug')
      const bugSearch = store.issuesCache.get('bug')
      expect(bugSearch.count).toBe(20)
      expect(bugSearch.issues).toEqual(mockIssues)
    })

    it('should clear cached errors on a successful response', async () => {
      const store = setupStore()
      axios.post.mockReset()
      axios.post.mockResolvedValue(successData)
      store.setError(new Error('Whoops'))
      await store.getIssues('weee')
      expect(store.error).toBeNull()
    })

    it('should not data from the Github API when the search term is less than two characters', async () => {
      const axios = require('axios')
      jest.spyOn(axios, 'post').mockResolvedValue({})
      const store = setupStore()
      await store.getIssues('a')
      expect(axios.post).not.toHaveBeenCalled()
    })

    it('should not data from the Github API when the search term is already cached', async () => {
      const axios = require('axios')
      jest.spyOn(axios, 'post').mockResolvedValue({})
      const store = setupStore()
      await store.getIssues('test')
      expect(axios.post).not.toHaveBeenCalled()
    })
  })
})
