import gatsbyConfig from '../../../gatsby-config'

const { siteMetadata } = gatsbyConfig

export default {
  graphql: () => {},
  useStaticQuery: () => ({ site: { siteMetadata } }),
}
