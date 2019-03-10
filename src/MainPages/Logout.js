import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { firebaseApp } from '../App';

class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    firebaseApp.auth().signOut().then((user) => {
      this.setState({
        redirect: true
      })
    })
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/login" />
    }
    return(
      <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
        <h3>Logging out</h3>
        <Spinner />
      </div>
      )
  }
}

export default Logout;
