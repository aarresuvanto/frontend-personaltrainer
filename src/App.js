import React from 'react';
import './App.css';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Customers from './views/Customers'
import Trainings from './views/Trainings'
import Calendar from './views/Calendar'

const linkStyle = { 
  paddingLeft: 15,
  paddingRight: 15,
}

function App() {
  return (
    <div className="App">
      <h3>Personal-Trainer</h3>
      <BrowserRouter>
        <Link style={linkStyle} to="/">Customers</Link>
        <Link style={linkStyle} to="/customers">Customers</Link>
        <Link style={linkStyle} to="/trainings">Trainings</Link>
        <Switch>
          <Route exact path="/" component={Customers}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/trainings" component={Trainings}/>
          <Route path="/calendar" component={Calendar}/>
        </Switch>
      </BrowserRouter>
      <Customers />
    </div>
  );
}

export default App;
