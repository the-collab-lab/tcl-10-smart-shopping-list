import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { db } from './lib/firebase.js';
import './App.css';
import List from './components/List';
import AddItem from './components/AddItem';
import BottomNav from './components/BottomNav';

function App() {
  let [results, setResults] = useState([]);

  useEffect(() => {
    db.collection('shopping-list').onSnapshot(function(querySnapshot) {
      let querySnapshotResults = [];
      querySnapshot.forEach(function(doc) {
        const { id, name } = doc.data();
        querySnapshotResults.push({ id, name });
      });
      setResults(querySnapshotResults);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route
            exact
            path="/list"
            render={() => {
              return <List listItems={results} />;
            }}
          />
          <Route
            exact
            path="/add-item"
            render={() => {
              return <AddItem />;
            }}
          />
        </Switch>
      </header>
      <BottomNav />
    </div>
  );
}

export default App;
