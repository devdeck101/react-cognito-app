import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth } from 'aws-amplify'

Amplify.configure({
  identityPoolRegion: 'us-east-1',
  userPoolId: 'us-east-1_SEUCODIGO',
  userPoolWebClientId: 'SEUCODIGO'
})




class App extends Component {

  constructor() {
    super()
    this.state = {
      accUsername: null,
      accEmail: null,
      accPhone: null,
      accPassword: null,
      accConfirmationCode: null,
      username: null,
      password: null,
      waitingConfirmation: null,
      userLoggedIn: false
    }

    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleConfirmation = this.handleConfirmation.bind(this)

  }


  handleChange(e) {
    e.preventDefault()
    let stateName = e.target.name
    let stateValue = e.target.value
    // console.log(e.target.name, e.target.value)
    this.setState({ [stateName]: stateValue })
  }

  handleSignUp() {
    console.log('SignUp - Start')
    //Create account
    let { accUsername, accEmail, accPhone, accPassword } = this.state
    Auth.signUp({
      username: accUsername,
      password: accPassword,
      attributes: {
        email: accEmail,
        phone_number: accPhone
      }
    }).then(data => {
      console.log(data)
      this.setState({ waitingConfirmation: true })
    }).catch(err => {
      console.log(err)
    })

    console.log('SignUp - End')
  }

  handleConfirmation() {
    console.log('Confirmation - Start')
    let { accUsername, accConfirmationCode } = this.state
    Auth.confirmSignUp(accUsername, accConfirmationCode)
      .then(data => {
        console.log(data)
        this.setState({waitingConfirmation: false})
      }).catch(err => {
        console.log(err)
      })
    console.log('Confirmation - End')
  }

  handleSignIn() {
    console.log('SignIn - Start')
    let { username, password } = this.state
    Auth.signIn(username, password)
    .then(user => {
      console.log(user)
      this.setState({userLoggedIn: true})
    }).catch(err => {
      console.log(err)
    })
    console.log('SignIn - End')

  }



  handleSignOut() {

    console.log('SignOut - Start')
    Auth.signOut()
    .then(data => {
      console.log(data)
      this.setState({userLoggedIn: false})
    }).catch(err => {
      console.log(err)
    })
    console.log('SignOut - End')

  }

  render() {
    return (
      <div>
        {/* Start Modal */}
        <div className="modal bg-dark" id="signUp" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create your Account</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="text-success font-weight-bold text-center">!!! Não se esqueça de se Inscrever no Canal !!!</p>
                {/* Sgin Up Form */}
                <form>
                  <div className="form-group">
                    <label htmlFor="accUsername">Username</label>
                    <input type="input" className="form-control" id="accUsername" name="accUsername" aria-describedby="usernameHelp" placeholder="Enter a username."
                      onChange={e => this.handleChange(e)}
                    />
                    <small id="usernameHelp" className="form-text text-muted">Choose your username.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="accEmail">Email address</label>
                    <input type="input" className="form-control" id="accEmail" name="accEmail" aria-describedby="emailHelp" placeholder="Enter email"
                      onChange={e => this.handleChange(e)}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="accPhone">Phone</label>
                    <input type="input" className="form-control" id="accPhone" name="accPhone" aria-describedby="phoneHelp" placeholder="Enter a phone number."
                      onChange={e => this.handleChange(e)}
                    />
                    <small id="phoneHelp" className="form-text text-muted">I.E. +551199999999</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="accPassword">Password</label>
                    <input type="password" className="form-control" id="accPassword" name="accPassword" placeholder="Password"
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={this.handleSignUp}>Sign Up</button>
                </form>
                {this.state.waitingConfirmation && (
                  <div className="mt-3">
                    <div className="form-group">
                      <label htmlFor="accConfirmationCode">Confirmation Code</label>
                      <input type="input" className="form-control" id="accConfirmationCode" name="accConfirmationCode" aria-describedby="confirmationHelp" placeholder="Enter the Confirmation Code."
                        onChange={e => this.handleChange(e)}
                      />
                      <small id="confirmationHelp" className="form-text text-muted">Go to your E-mail and Get the Code.</small>
                    </div>
                    <button type="button" className="btn btn-primary"
                      onClick={this.handleConfirmation}
                    >Confirm Code</button>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

              </div>
            </div>
          </div>
        </div>
        {/* End Modal */}

        {/* Start Login Form */}


        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Autênticação Serverless com <code>Developer Deck 101</code> usando React, AWS Amplify e AWS Cognito.
          </p>

            <div>
              <div className="form-signin">
                <img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="username" className="sr-only">Email address</label>
                <input type="text" id="username" name="username" className="form-control m-3" placeholder="Username" required autoFocus
                  onChange={e => this.handleChange(e)}
                />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="password" name="password" className="form-control m-3" placeholder="Password" required
                  onChange={e => this.handleChange(e)} />
                <button className="btn btn-lg btn-primary btn-block m-3" type="submit"
                  onClick={this.handleSignIn}
                >Sign in</button>
                <h5 className="mt-3 mb-3 text-muted">&copy; Share and Like it!</h5>
                <h5 className="mt-3 mb-3 text-muted">&copy; Deixe seu Like e Compartilhe</h5>
              </div>
              <p>
                {
                  this.state.userLoggedIn && (
                    <button type="button" className="btn btn-lg btn-success btn-block m-3" onClick={this.handleSignOut}>Sign Out</button>
                  )
                }
                <button type="button" className="btn btn-lg btn-success btn-block m-3" data-toggle="modal" data-target="#signUp">Create an Account</button>
              </p>
            </div>
          </header>
        </div>
        {/* End Login Form */}

      </div>//enloser tag
    );
  }
}

export default App;
