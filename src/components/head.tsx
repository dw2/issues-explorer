import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface Props {
  title?: string
  description?: string
}

export default ({ title, description }: Props) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  const { siteMetadata } = data.site
  const metaTitle = title || siteMetadata.title
  const metaDescription = description || siteMetadata.description
  const titleTemplate = title
    ? `%s | ${siteMetadata.title}`
    : siteMetadata.title

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={metaTitle}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ]}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Rubik|Quicksand&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  )
}
