import React from 'react'
import { Provider } from 'mobx-react'
import IssuesStore from './src/stores/issues-store'

export default ({ element }) => (
  <Provider issues={new IssuesStore()}>{element}</Provider>
)
