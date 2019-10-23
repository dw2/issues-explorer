export default {
  endpoint: 'https://api.github.com/graphql',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
}
