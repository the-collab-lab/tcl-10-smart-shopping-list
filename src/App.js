import React from 'react';
import logo from './logo.svg';
import * as firebase from 'firebase';
import 'firebase/firestore';
import './App.css';

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

db.collection('shopping-list')
  .get()
  .then(results => {
    results.forEach(result => {
      console.log(`${result.id} => ${JSON.stringify(result.data())}`);
    });
  });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
