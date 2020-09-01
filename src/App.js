import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { db, updateFirestore } from './lib/firebase.js';
import { calculateFrequency } from './lib/estimates';
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
          const { name, purchaseDates, frequency } = doc.data();
          const { id } = doc;

          if (name) {
            querySnapshotResults.push({ id, name, purchaseDates, frequency });
          }
        });

        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'modified') {
            // console.log('change.doc.data',  change.doc.data())
            let updatedPurchaseDates = change.doc.data().purchaseDates;
            console.log(results);
            let oldPurchaseDates = results.find(
              elem => elem.id === change.doc.id,
            );
            console.log('updated', updatedPurchaseDates);
            console.log('old', oldPurchaseDates);

            if (
              updatedPurchaseDates.length >= 2 &&
              oldPurchaseDates.length !== updatedPurchaseDates.length
            ) {
              let updatedFrequency = calculateFrequency(updatedPurchaseDates);
              updateFirestore(token, change.doc.id, {
                frequency: updatedFrequency,
              });
            }
          }
        });

        setResults(querySnapshotResults);
        setIsLoading(false);
      });
    }

    return unsubscribe;
  }, [token, results]);

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
      </header>
      {token ? <BottomNav /> : null}
    </div>
  );
}

export default App;
