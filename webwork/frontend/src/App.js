import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ActiveComplaintsPage from './pages/ActiveComplaintsPage';
import PendingComplaintsPage from './pages/PendingComplaintsPage';
import ResolvedComplaintsPage from './pages/ResolvedComplaintsPage';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <HashRouter basename='/'>
        <Switch>
         <Route path='/' exact component={LandingPage} />
         <Route path='/signUpPage' exact component={SignUpPage} />
         <Route path='/loginPage' exact component={LoginPage} />
         <Route path='/homePage' exact component={HomePage} />
         <Route path='/activeComplaintsPage' exact component={ActiveComplaintsPage} />
         <Route path='/pendingComplaintsPage' exact component={PendingComplaintsPage} />
         <Route path='/resolvedComplaintsPage' exact component={ResolvedComplaintsPage} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;