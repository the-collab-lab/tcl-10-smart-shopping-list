import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { db } from './lib/firebase.js';
import { writeToFirestore } from './lib/firebase';
import './App.css';
import List from './components/List';
import AddItem from './components/AddItem';
import BottomNav from './components/BottomNav';

function App() {
  let [results, setResults] = useState([]);
  let [name, setName] = useState('');

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

  function handleSubmitForm(event) {
    event.preventDefault();
    if (name.length > 0) {
      writeToFirestore('shopping-list', { name });
      setName('');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <div style={{ background: '#fff', padding: '40px', borderRadius: 5 }}>
          <ul style={{ color: 'black' }}>
            {results.map(result => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div> */}
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
              return (
                <AddItem
                  handleSubmitForm={handleSubmitForm}
                  name={name}
                  setName={setName}
                />
              );
            }}
          />
        </Switch>
      </header>

      <BottomNav />
    </div>
  );
}

export default App;
