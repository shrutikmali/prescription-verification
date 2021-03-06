import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Prescription from './Prescription/Prescription';
import Prescriber from './Prescriber/Prescriber';
import Print from './Print/Print';
import Verify from './Verify/Verify';
import './index.css';


const App = () => {

  return (
    <Switch>
      <Route path='/prescriber'>
        <Prescriber />
      </Route>
      <Route path='/prescription'>
        <Prescription />
      </Route>
      <Route path='/print/:id'>
        <Print />
      </Route>
      <Route path='/verify/:id'>
        <Verify />
      </Route>
      <Route path='/'>
        <h3>Navigate to /prescriber to create an account</h3>
        <h3>Navigate to /prescription to create prescription</h3>
      </Route>
    </Switch>
  );
}

export default App;