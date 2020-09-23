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
          const { name, addedDate, purchaseDates, frequency } = doc.data();
          const { id } = doc;
          if (name) {
            querySnapshotResults.push({
              id,
              name,
              addedDate,
              purchaseDates,
              frequency,
            });
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
      <div className="App-container">
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              token ? <Redirect to="/list" /> : <Welcome setToken={setToken} />
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
                    results={results}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    token={token}
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
      {token ? <BottomNav /> : null}
    </div>
  );
}

export default App;
