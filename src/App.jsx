import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './pages/Home'
import SinglePhoto from './pages/SinglePhoto';
import Error from './pages/Error';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/photo/:id'>
          <SinglePhoto/>
        </Route>
        <Route path='*'>
          <Error/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
