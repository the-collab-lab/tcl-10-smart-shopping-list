import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';
import List from './components/List';
import AddItem from './components/AddItem';
import BottomNav from './components/BottomNav';
import RequireAuth from './components/RequireAuth';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ background: '#fff', padding: '40px', borderRadius: 5 }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Welcome setToken={setToken} />}
            />
            <RequireAuth>
              <Route exact path="/list" render={() => <List token={token} />} />
              <Route
                exact
                path="/add-item"
                render={() => <AddItem token={token} />}
              />
            </RequireAuth>
            <Redirect to="/" />
          </Switch>
        </div>
      </header>
      {token ? <BottomNav /> : null}
    </div>
  );
}

export default App;
