module.exports = {
  siteMetadata: {
    title: 'Github Issues Explorer',
    description: 'Code challenge for NuOrder',
    author: '@dw2',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'issues-explorer',
        short_name: 'issues-explorer',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#000000',
        display: 'standalone',
        // icon: 'src/images/gatsby-icon.png',
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
