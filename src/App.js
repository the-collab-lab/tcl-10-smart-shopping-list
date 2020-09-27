import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { db } from './lib/firebase.js';
import './App.css';
import { Box } from '@material-ui/core';
import Welcome from './components/Welcome';
import List from './components/List';
import AddItem from './components/AddItem';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import RequireAuth from './components/RequireAuth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  appContainer: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    background: '#fff',
  },
  topNav: {
    flex: '0 1 auto',
  },
  mainContent: {
    flex: '1 1 auto',
    padding: '20px',
  },
  bottomNav: {
    flex: '0 1 auto',
  },
});

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  let [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const classes = useStyles();

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
    <Box className="App">
      <Box className={classes.appContainer}>
        <TopNav className={classes.topNav} token={token} setToken={setToken} />
        <Box className={classes.mainContent}>
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
        </Box>
        {token ? (
          <Box className={classes.bottomNav}>
            <BottomNav />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default App;
