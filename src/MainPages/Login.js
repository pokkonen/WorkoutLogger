import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent, Position, Spinner} from '@blueprintjs/core';
import { firebaseApp, base, facebookProvider } from '../App';
//import {Spinner} from 'react-spinkit';
const mySpinner = <Spinner intent={Intent.PRIMARY} />

const loginStyles = {
  width: "100%",
  maxWidth: "315px",
  margin: "50px auto",
  border: '4px solid #fff',
  borderRadius: "5px",
  padding: "20px",
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    }

    this.authWithFacebook = this.authWithFacebook.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
  }

  authWithFacebook() {
    console.log("Authenticated with Facebook!")
    firebaseApp.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
        } else {
          this.setState({
            redirect: true
          })
        }
      })
  }

  authWithEmailPassword(e) {
    e.preventDefault()
    console.log("Authenticated with email and password.")

    const email = this.refs.emailInput.value;
    const password = this.refs.passwordInput.value;

    firebaseApp.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // Create user
          // Tee myöhemmin oikea rekisteröinti
        } else if (providers.indexOf("password") === -1) {
          // they used facebook
          this.loginForm.reset()
          this.toaster.show({ intent: Intent.DANGER, message: "Try facebook login."})
          // Toaster ei näy
          console.log("toimii")
        } else {
          // sign user in
        }

      })
      .catch((error) => {
        console.log("error")
        this.toaster.show({ intent: Intent.WARNING, message: error.message })
      })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/home" />
    }

    return (
      <div className="container" style={loginStyles}>
        <Toaster ref={(element) => {this.toaster = element}} position={Position.TOP}/>
        <h2 className="col-sm-12">Login to use the app.</h2>
        <div className="col-sm-12">
          <button className="btn btn-primary col-sm-12"
                  onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button>
        </div>
        <form className="form-horizontal" onSubmit={(e) => { this.authWithEmailPassword(e) }} ref="formInput">
          <div className="form-group">
            <label className="control-label col-sm-4">Email</label>
              <div className="col-sm-12">
                <input className="form-control" name="email" type="email" placeholder="Email" ref="emailInput" />
              </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">Password</label>
              <div className="col-sm-12">
                <input className="form-control" name="password" type="password" placeholder="Password" ref="passwordInput" />
              </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary col-sm-7" value="Log In">Login</button>
            </div>
          </div>
        </form>

        <h3 className="col-sm-12" style={{paddingTop: '30px'}}>If you don't have user yet, you can sign up below.</h3>
          <form className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-sm-4">Email</label>
                <div className="col-sm-12">
                  <input className="form-control" name="email" type="email" placeholder="Email"
                    ref={(input) => {this.emailInput = input }} />
                </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2">Password</label>
                <div className="col-sm-12">
                  <input className="form-control" name="password" type="password" placeholder="Password"
                    ref={(input) => {this.passwordInput = input }} />
                </div>
            </div>
            {/*
            <div className="form-group">
              <label className="control-label col-sm-2">Password</label>
                <div className="col-sm-12">
                  <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm password"
                    ref={(input) => {this.passwordInput = input }} />
                </div>
            </div>
            */}
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary col-sm-6" value="Log In">Sign Up</button>
              </div>
            </div>
          </form>
      </div>
    )
  }
}

export default Login;
