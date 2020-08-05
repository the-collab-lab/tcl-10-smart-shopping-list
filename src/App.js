import React from 'react';
import logo from './logo.svg';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import List from './components/List';
import AddItem from './components/AddItem';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/list" component={List} />
        <Route exact path="/add-item" component={AddItem} />
      </Switch>
      <BottomNav />
    </div>
  );
}

export default App;
