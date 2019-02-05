import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewPage from './NewPage'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Index extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <Route exact path="" component={App} />
          <Route path="/new" component={NewPage} />
        </div>
    </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
