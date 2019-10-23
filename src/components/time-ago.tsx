import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

export default ({ date }: { date: string }) => {
  const timeAgo = new TimeAgo('en-US')

  return <time>{timeAgo.format(new Date(date))}</time>
}
