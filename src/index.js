import { applyMiddleware, compose, createStore } from 'redux'

import Main from 'components/main'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import reducer from 'redux/reducers'
import thunk from 'redux-thunk'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: trebuchet;
    background-color: #fff;
    color: #a1a1a1;
  }
`

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk]

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <Main />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))