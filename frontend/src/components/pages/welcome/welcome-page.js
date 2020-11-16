import React from 'react'
import './welcome-page.css';
import WelcomeHeader from './welcome-header/welcome-header';
import SignIn from './sign-in/sign-in';

const WelcomePage = () => {

    return (
      <div id="welcome-page">
        <div >
          <WelcomeHeader/>
          <SignIn/>
        </div>
      </div>
    );
  }
  
  export default WelcomePage;