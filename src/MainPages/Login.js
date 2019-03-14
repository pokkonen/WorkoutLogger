import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent, Position} from '@blueprintjs/core';
import { firebaseApp, facebookProvider } from '../App';

const loginStyles = {
  width: "100%",
  maxWidth: "315px",
  maxHeight: "80%",
  margin: "10px auto",
  border: '4px solid #fff',
  borderRadius: "5px",
  padding: "",
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
          this.createUser()
        } else if (providers.indexOf("password") === -1) {
          // they used facebook
          this.refs.loginForm.reset()
          this.toaster.show({ intent: Intent.DANGER, message: "Try facebook login."})
        } else {
          return firebaseApp.auth().signInWithEmailAndPassword(email, password);
          // sign user in
        }
      })
      .then((user) => {
        if (user && user.user.email) {
          this.refs.loginForm.reset()
          this.setState({
            redirect: true
          })
        }
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          this.toaster.show({ intent: Intent.WARNING, message: "User not found, please sign up!" })
        } else {
          console.log("error")
          console.log(error)
          this.toaster.show({ intent: Intent.WARNING, message: error.message })
        }
      })
  }

  createUser(e) {
    e.preventDefault()
    const newEmail = this.refs.newEmail.value;
    const newPassword = this.refs.newPassword.value;

    firebaseApp.auth().fetchProvidersForEmail(newEmail)
      .then((providers) => {
        if (providers.length !== 0) {
          this.toaster.show({ intent: Intent.DANGER, message: "You already have a user, try login."})
        } else {
            return firebaseApp.auth().createUserWithEmailAndPassword(newEmail, newPassword)
        }
      })
      .then((user) => {
        if (user && user.user.email) {
          this.refs.loginForm.reset()
          this.toaster.show({ intent: Intent.SUCCESS, message: "User created successfully! Logging in..."})
          setTimeout(() =>
            this.setState({
              redirect: true
            }), 2000
          )
        }
      })
      .catch((error) => {
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
        {/*             Login start           */}
        <form className="form-horizontal" onSubmit={(e) => { this.authWithEmailPassword(e) }} ref="loginForm">
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
        {/*             Login end           */}

        {/*             Signup start           */}
        <h3 className="col-sm-12" style={{paddingTop: '30px'}}>If you don't have user yet, you can sign up below.</h3>
          <form className="form-horizontal" onSubmit={(e) => { this.createUser(e) }} ref="signupForm">
            <div className="form-group">
              <label className="control-label col-sm-4">Email</label>
                <div className="col-sm-12">
                  <input className="form-control" name="email" type="email" placeholder="Email" ref="newEmail" />
                </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2">Password</label>
                <div className="col-sm-12">
                  <input className="form-control" name="password" type="password" placeholder="Password" ref="newPassword" />
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
          {/*             Signup end          */}
      </div>
    )
  }
}

export default Login;
