import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import List from './List';
import AddItem from './AddItem';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/list" component={List} />
          <Route exact path="/add-item" component={AddItem} />
        </Switch>
        <Nav />
      </Router>
    </div>
  );
}

export default App;
