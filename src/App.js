import React, { Component } from "react";
// import BotsPage from "./containers/BotsPage";
import { connect } from 'react-redux';//needed to inport stuff from connect
import "./App.css";
import LoginPage from './Loginout/LoginPage';
import GameContainer from './GameStuff/GameContainer'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authToken: '',
      page: 1,
    }
  }

  renderLogin() {

    if (this.state.authToken.length < 1) {
      // 
    }
    switch (this.state.page) {
      case 0:
        return <LoginPage login={this.login} />
      case 1:
        return <div><button onClick={this.logout}>Log-out</button><GameContainer /></div>
      default:
        return <div>Error Defaulted</div>
    }
  }

  login = (userN, passW) => {
    // this.props.login();
    this.setState({
      page: 1
    })

    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: userN,
          password: passW
        }
      })
    }).then(res => res.json()).then(res => {
      this.setState({
        authToken: res['jwt']
      })
    })
  };
  logout = () => {
    // this.props.logout();
    this.setState({ authToken: '', page: 0 })
  };
  render() {////////////////RENDER//////////////////
    return (
      <div className="App">
        {this.renderLogin()}
      </div >
    );
  }


}
const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increaseCount: () => dispatch({ type: 'INCREASE_COUNT' }),
    login: (u, p) => dispatch({ type: 'LOGIN', payload: { u: u, p: p } }),//wontWork
    logout: () => dispatch({ type: 'LOGOUT', payload: 'LogOutAction' }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// simple request
// fetch('http://localhost:3000/api/v1/profile', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer <token>`
//   }
// })

// example logon/create response
// jwt: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.TIADUXTXQwKAAgk1QpPx7k5Y8LHmAQnJo6GDRvug6AI"
// ​
// user: {…}
// ​​
// id: 2
// ​​
// username: "bario"

// loginEx() {
//   // componentDidMount
//   fetch('http://localhost:3000/api/v1/login', {//or signin
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     },
//     body: JSON.stringify({
//       user: {
//         username: 'dario',
//         password: 'a'
//       }
//     })
//   })
//     .then(r => r.json())
//     .then(r => console.log('appLog', r))
// }

// create user
// makeAUser() {
//   // componentDidMount
//   fetch('http://localhost:3000/api/v1/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     },
//     body: JSON.stringify({
//       user: {
//         username: 'bario',
//         password: 'a'
//       }
//     })
//   })
//     .then(r => r.json())
//     .then(r => console.log('appLog', r))
// }
