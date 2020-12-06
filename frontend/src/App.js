import React, {Component} from 'react';
import WelcomePage from './components/pages/welcome/welcome-page';
import {BrowserRouter as Router, Route} from'react-router-dom';
import MainPage from './components/pages/main-page/main-page';
import './App.css';
import Footercomp from './components/footer/footer';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={WelcomePage}></Route>
        <Route exact path='/main-page' component={MainPage}></Route>
        <Footercomp/>
      </Router>
    );
  }
}

export default App;

