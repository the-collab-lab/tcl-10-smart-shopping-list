import React, { useState } from 'react';
import { db } from './lib/firebase.js';
import { writeToFirestore } from './lib/firebase';
import { TextField, Button } from '@material-ui/core';
import './App.css';

function App() {
  let [results, setResults] = useState([]);
  let [name, setName] = useState('');

  React.useEffect(() => {
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
