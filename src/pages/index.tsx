import React, { useRef } from 'react'
import Layout from '../layouts/default'
import SearchBox from '../components/search-box'
import IssueList from '../components/issue-list'

const IndexPage = () => {
  const inputRef = useRef(null)
  const listRef = useRef(null)

  return (
    <Layout>
      <SearchBox inputRef={inputRef} listRef={listRef} />
      <IssueList inputRef={inputRef} listRef={listRef} />
    </Layout>
  )
}

export default IndexPage
