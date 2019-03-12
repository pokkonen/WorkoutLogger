import React from 'react';
import ReactDOM from 'react-dom';
import {Switch} from 'react-router';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
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


class ProtectedRoute extends React.Component {
  render() {
    return(
      firebaseApp.auth().currentUser ? <Route render={(props) => <App />} /> : <Redirect to="login" />
    )
  }
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
    }
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (this._isMounted) {
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
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
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

    return(
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route path="/new" component={NewPage} />
              <ProtectedRoute path="/home" component={App} />
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
