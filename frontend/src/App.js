import React, { Component } from 'react';
import WelcomePage from './components/pages/welcome/welcome-page';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/pages/main-page/main-page';
import './App.css';
import Footercomp from './components/footer/footer';
import ProfileContent from './components/pages/profile-page/profile';
import FullBook from './components/pages/main-page/full-book/full-book';
import Settings from './components/pages/settings-page/settings';
import FindBook from './components/pages/find-book-page/find-book';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={WelcomePage}></Route>
          <Route exact path='/main-page' component={MainPage}></Route>
          <Route exact path='/settings' component={Settings}></Route>
          <Route exact path='/find-book' component={FindBook}></Route>
          <Route exact path='/profile-page' component={ProfileContent}></Route>
          <Route exact path="/:isbn" component={FullBook} />
        </Switch>
        <Footercomp />
      </BrowserRouter>
    );
  }
}

export default App;

