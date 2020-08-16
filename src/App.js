import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { db } from './lib/firebase.js';
import './App.css';
import Welcome from './components/Welcome';
import List from './components/List';
import AddItem from './components/AddItem';
import BottomNav from './components/BottomNav';
import RequireAuth from './components/RequireAuth';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  let [results, setResults] = useState([]);

  useEffect(() => {
    if (token) {
      const unsubscribe = db
        .collection(token)
        .onSnapshot(function(querySnapshot) {
          let querySnapshotResults = [];
          querySnapshot.forEach(function(doc) {
            const { name } = doc.data();
            const { id } = doc;

            if (name) {
              querySnapshotResults.push({ id, name });
            }
          });
          setResults(querySnapshotResults);
        });

      return unsubscribe;
    }
  }, [token]);

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
              <Route
                exact
                path="/list"
                render={() => <List results={results} />}
              />
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
