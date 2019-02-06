import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewPage from './MainPages/NewPage'
import WelcomePage from './MainPages/WelcomePage';
import ErrorPage from './MainPages/ErrorPage';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch} from 'react-router';

class Index extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/home" component={App} />
            <Route path="/new" component={NewPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// <Route path="" component={Header} />
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
