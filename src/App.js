import React, { useState } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import './App.css';

import { TextField, Button } from '@material-ui/core';

let app = firebase.initializeApp({
  apiKey: 'AIzaSyDFXBbPe8ZUkuAIc4Ep-BGbesyTW4yPy-g',
  authDomain: 'tcl-10-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-10-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-10-smart-shopping-list',
  storageBucket: 'tcl-10-smart-shopping-list.appspot.com',
  messagingSenderId: '946401926689',
  appId: '1:946401926689:web:24889e069cf0aff111cd60',
});

let db = firebase.firestore();

function loadResults() {
  return db
    .collection('shopping-list')
    .get()
    .then(results => {
      return results.docs.map(result => ({
        id: result.id,
        data: result.data(),
      }));
    });
}

function addItemToShoppingList(name) {
  console.log(name);
  return db.collection('shopping-list').add({ name });
}

function App() {
  let [results, setResults] = useState([]);
  let [name, setName] = useState('');
  function refreshResults() {
    loadResults().then(data => setResults(data));
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    if (name.length > 0) {
      addItemToShoppingList(name).then(refreshResults);
    }
  }

  if (results.length === 0) {
    refreshResults();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ background: '#fff', padding: '40px', borderRadius: 5 }}>
          <ul style={{ color: 'black' }}>
            {results.map(result => (
              <li key={result.id}>{result.data.name}</li>
            ))}
          </ul>

          <form onSubmit={handleSubmitForm}>
            <TextField
              id="standard-basic"
              label="Item"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={name.length === 0}
            >
              Submit
            </Button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
