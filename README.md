# Issues Explorer Code Challenge

### Task

Using [Github’s API](https://developer.github.com/), build an application with an autocomplete input box for searching issues for [React’s repo](https://github.com/facebook/react/issues). Input and results should be able to navigate via keyboard shortcuts. Each result should have but not limited to, the issue’s title and labels.

### Built with...
  + React + Gatsby + Typescript
  + Github API v4 + GraphQL
  + Axios for data fetching
  + MobX for state management
  + Styled Components for CSS-in-JS
  + Jest + React Testing Library
  + Eslint + Prettier

### Demo

[issues-explorer-challenge.netlify.com](https://issues-explorer-challenge.netlify.com/)

![issues-explorer-demo](https://user-images.githubusercontent.com/746347/67442535-0b109580-f5b6-11e9-9587-c6c01a43aaf7.gif)

### Running locally
  1. Create a `.env` file in the root directory and [add your Github personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
  1. Add `GATSBY_GITHUB_TOKEN=YOUR_TOKEN_HERE` to `.env`
  1. Set your node version with `nvm use` ![install nvm needed](https://github.com/nvm-sh/nvm)
  1. Install dependencies `yarn`
  1. Fire up the dev server `yarn dev`
