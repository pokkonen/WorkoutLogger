import React, { Component } from 'react';
import './NewPage.css';
import Header from '../Header';

class NewPage extends Component {
  render() {
    return(
      <div>
        <Header />
        <div className="tempFont">
          <h1>This is a new page</h1>
          <br />
          <ul>
            <li> test 1 </li>
            <li> test 2 </li>
            <li> test 3 </li>
          </ul>
          <br />
          <br />
          <br />
          <p> End </p>
        </div>
      </div>
    )
  }
}

export default NewPage;
