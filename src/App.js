import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';
import List from './components/List';
import AddItem from './components/AddItem';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ background: '#fff', padding: '40px', borderRadius: 5 }}>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/list" component={List} />
            <Route exact path="/add-item" component={AddItem} />
            <Redirect to="/" />
          </Switch>
        </div>
      </header>
      <BottomNav />
    </div>
  );
}

export default App;
