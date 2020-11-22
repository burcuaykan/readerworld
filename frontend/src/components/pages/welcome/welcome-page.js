import React from 'react'
import './welcome-page.css';
import SignIn from './sign-in/sign-in';

const WelcomePage = () => {

    return (
      <div id="welcome-page">
        <div >
          <SignIn/>
        </div>
      </div>
    );
  }
  
  export default WelcomePage;