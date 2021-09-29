import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Prescription from './Prescription/Prescription';
import Header from './Header';
import Prescriber from './Prescriber/Prescriber';
import './index.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/prescription'>
          <Prescription />
        </Route>
        <Route path='/test'>
          <Header />
        </Route>
        <Route path='/'>
          <h3>App</h3>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;