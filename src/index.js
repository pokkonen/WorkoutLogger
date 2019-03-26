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
    if (firebaseApp.auth().currentUser) {
      return(
        <App />
      )
    }

    if (!firebaseApp.auth().currentUser) {
      return(
         <Redirect to="login" />
      )
    }
  }
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.setState({
      loading: false,
    })
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "", position: "absolute", top: "35%", left: "47%" }}>
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
