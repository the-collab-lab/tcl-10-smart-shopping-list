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
        <div style={{ background: '#fff', padding: '40px', borderRadius: 5 }}>
          <ul style={{ color: 'black' }}>
            {results.map(result => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmitForm}>
            <label
              style={{
                color: 'grey',
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
              for="add-shopping-list-item"
            >
              Add Item
            </label>
            <div style={{ display: 'flex' }}>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                id="add-shopping-list-item"
              ></input>
              <button disabled={name.length === 0} type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
        <Switch>
          <Route exact path="/list" component={List} />
          <Route exact path="/add-item" component={AddItem} />
        </Switch>
      </header>

      <BottomNav />
    </div>
  );
}

export default App;
