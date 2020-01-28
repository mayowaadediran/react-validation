import React from 'react';
import { Switch, Route } from "react-router-dom";
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import './App.css';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;



