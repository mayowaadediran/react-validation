import React from 'react';
import { Switch, Route } from "react-router-dom";
import Form from './components/Form'

import Dashboard from './components/Dashboard'
import './App.css';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Form} />
      </Switch>
    </div>
  );
}

export default App;



