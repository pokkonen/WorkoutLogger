import React from 'react';
import ReactDOM from 'react-dom';
import {Switch} from 'react-router';
import {BrowserRouter, Route} from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';

import './index.css';
import App from './App';
import NewPage from './MainPages/NewPage'
import WelcomePage from './MainPages/WelcomePage';
import ErrorPage from './MainPages/ErrorPage';
import Login from './MainPages/Login';
import Logout from './MainPages/Logout';
import * as serviceWorker from './serviceWorker';
import { firebaseApp } from './App'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
    }
  }

  componentDidMount() {
    this.removeAuthListener = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener()
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner />
        </div>
      )
    }
    {/*Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in App (at src/index.js:62)*/ }
    return(
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route path="/new" component={NewPage} />
              <Route path="/home" render={(props) => (<App {...props} auth={this.state.authenticated} />)} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </BrowserRouter>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
