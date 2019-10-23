import { observable, action, decorate } from 'mobx'
import axios from 'axios'
import axiosConfig from '../config/axios'
import { getInLocal, setInLocal } from '../lib/local-storage'

const { endpoint, headers } = axiosConfig

interface Label {
  name: string
  color: string
}

export interface Issue {
  title: string
  url: string
  createdAt: string
  labels: Label[]
}

class IssuesStore {
  storageKey = 'explorer.issues'
  issuesCache = observable.map()
  recentSearch = ''
  error = null

  constructor() {
    // Only hdyrate from localStorage on the client side
    if (
      // @ts-ignore
      !global.window ||
      !window.localStorage ||
      !window.localStorage.getItem
    ) {
      return
    }
    const data = getInLocal(this.storageKey)

    // @ts-ignore key is guarded for
    if ('issues' in data) this.issuesCache = observable.map(data.issues)
    // @ts-ignore key is guarded for
    if ('recentSearch' in data) this.recentSearch = data.recentSearch
  }

  // persist observables client side
  saveLocal() {
    const { issuesCache, recentSearch } = this
    const issues = Array.from(issuesCache.entries())
    setInLocal(this.storageKey, { issues, recentSearch })
  }

  setError(error: Error) {
    this.error = error
  }

  setRecentSearch(search: string) {
    this.recentSearch = search
    this.saveLocal()
  }

  get current(): null | { issues: Issue[]; count: number } {
    if (this.issuesCache.has(this.recentSearch)) {
      return this.issuesCache.get(this.recentSearch)
    }
    return null
  }

  get issues(): Issue[] {
    const current = this.current
    return current ? current.issues : []
  }

  get issueCount(): number {
    const current = this.current
    return current ? current.count : 0
  }

  async getIssues(search: string): Promise<void> {
    // check if the term has been searched before
    if (this.issuesCache.has(search)) {
      this.setRecentSearch(search)
      return
    }
    // search by at least two characters
    if (search.length < 2) return

    try {
      const { data } = await axios.post(
        endpoint,
        {
          query: `
            query($search:String!) {
              search(
                query: $search,
                type:ISSUE,
                first: 10,
              ) {
                issueCount
                edges {
                  node {
                    ... on Issue {
                      title
                      url
                      createdAt
                      labels(first: 5) {
                        edges { node { name, color } }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            search: `
              user:facebook
              repo:react
              is:open
              is:issue
              in:title
              sort:created-desc
              ${search}
            `,
          },
        },
        { headers }
      )
      // Map the response to a nicer object
      const { issueCount, edges } = data.data.search
      const issues = edges.map(issue => {
        const { title, url, createdAt, labels: labelData } = issue.node
        const labels = labelData
          ? labelData.edges.map(label => {
              const { name, color } = label.node
              return { name, color }
            })
          : []
        return { title, url, createdAt, labels }
      })
      // update the issues observable
      this.issuesCache.set(search, { issues, count: issueCount })
      this.setRecentSearch(search)
      // clear the error if there was one previously
      if (this.error) this.setError(null)
    } catch (error) {
      // capture the error
      this.setError(error.message)
    }
  }

  dehydrate() {
    return {
      issuesCache: this.issuesCache,
      recentSearch: this.recentSearch,
    }
  }
}

decorate(IssuesStore, {
  error: observable,
  recentSearch: observable,
  setRecentSearch: action,
  getIssues: action,
})

export default IssuesStore
