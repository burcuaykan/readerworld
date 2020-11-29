import React, {Component} from 'react';
import WelcomePage from './components/pages/welcome/welcome-page';
import {BrowserRouter as Router, Route} from'react-router-dom';
import MainPage from './components/pages/main-page/main-page';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' component={WelcomePage}></Route>
        <Route path='/main-page' component={MainPage}></Route>
      </Router>
    );
  }
}

export default App;

