import { MockedProvider } from '@apollo/client/testing'
import { render } from '@testing-library/react'
import { App } from './App'
import { helloWorldQuery } from './queries'

describe('App', () => {
  it('should render Hello World', async () => {
    const mocks = [{
      request: {
        query: helloWorldQuery
      },
      result: {
        data: {
          helloWorld: 'Hello World!'
        }
      }
    }]
    const { findByText } = render(<MockedProvider mocks={mocks}><App /></MockedProvider>)
    expect(await findByText('Hello World!')).toBeInTheDocument()
  })
})
