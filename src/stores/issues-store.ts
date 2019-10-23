import { observable, action, decorate } from 'mobx'

export interface Issue {
  title: string
  labels: string[]
}

class IssuesStore {
  issues = observable.array([])

  setIssues(issues: Issue[]) {
    this.issues.replace(issues)
  }

  dehydrate() {
    return {
      issues: this.issues,
    }
  }
}

decorate(IssuesStore, {
  setIssues: action,
})

export default IssuesStore
