import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Prescriber from './Prescriber/Prescriber';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/prescriber'>
          <Prescriber />
        </Route>
        <Route path='/'>
          <h3>App</h3>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;