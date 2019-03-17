import { applyMiddleware, compose, createStore } from 'redux'

import Main from 'components/main'
import Search from 'components/search'
import SearchedExercise from 'components/search/searchedExercise'
import { Nav } from 'components/nav'
import CurrentWorkout from 'components/currentWorkout'
import PreviousWorkouts from 'components/previousWorkouts'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import reducer from 'redux/reducers'
import thunk from 'redux-thunk'

export const history = createBrowserHistory()

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: Hind Siliguri;
    background-color: #000;
    color: #a1a1a1;
    margin: 0;
  }
`

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk, routerMiddleware(history)]

const store = createStore(
  reducer(history),
  composeEnhancers(applyMiddleware(...middlewares))
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/search" component={Search} />
              <Route
                exact
                path="/search/:exerciseName"
                component={SearchedExercise}
              />
              <Route exact path="/current" component={CurrentWorkout} />
              <Route exact path="/previous" component={PreviousWorkouts} />
            </Switch>
            <Nav />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
