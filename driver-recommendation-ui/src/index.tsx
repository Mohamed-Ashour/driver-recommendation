import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import { ApolloProvider } from '@apollo/client'
import { client } from './client'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  rootElement
)
