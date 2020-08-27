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
  const [isLoading, setIsLoading] = useState(true);
  let [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let unsubscribe;

    if (token) {
      unsubscribe = db.collection(token).onSnapshot(function(querySnapshot) {
        let querySnapshotResults = [];
        querySnapshot.forEach(function(doc) {
          const { name, purchaseDates } = doc.data();
          const { id } = doc;

          if (name) {
            querySnapshotResults.push({ id, name, purchaseDates });
          }
        });
        setResults(querySnapshotResults);
        setIsLoading(false);
      });
    }

    return unsubscribe;
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ background: '#fff', padding: '40px', borderRadius: 5 }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                token ? (
                  <Redirect to="/list" />
                ) : (
                  <Welcome setToken={setToken} />
                )
              }
            />
            <RequireAuth>
              <Route
                exact
                path="/list"
                render={() =>
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <List
                      token={token}
                      results={results}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />

                  )
                }
              />
              <Route
                exact
                path="/add-item"
                render={() => <AddItem token={token} results={results} />}
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
