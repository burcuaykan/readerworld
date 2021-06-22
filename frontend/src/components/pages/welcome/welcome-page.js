import React from 'react'
import './welcome-page.css';
import SignIn from './sign-in/sign-in';
import axios from 'axios';
import { Redirect } from "react-router-dom";


export default class WelcomePage extends Component {
  constructor(props) {
    super(props)



    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      signUp: false
    }
  }
  async componentDidMount() {
    const userObject = {
      username: this.state.username,
      password: this.state.password
    };

    var querystring = require('querystring');
    await axios.post('http://readerworld.ceng.metu.edu.tr:8080/login',
      // userObject,
      querystring.stringify({
        username: "ceng492@user.com", //gave the values directly for testing
        password: "ceng492",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        withCredentials: true
      })
      .then((response) => {
        this.setState({ loggedIn: true });
        console.log(response);
      }).catch((error) => {
        console.log(error)
      });
  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/main-page' />
    }
  }


  /*return (
    <div id="welcome-page">
      <div >
        <SignIn/>
      </div>
    </div>
  );*/
}

//export default WelcomePage;