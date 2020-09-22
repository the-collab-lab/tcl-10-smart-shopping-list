import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';
import { writeToFirestore, db } from '../lib/firebase';
import { Button } from '@material-ui/core';

const Welcome = ({ setToken }) => {
  const [input, setInput] = useState('');

  const setTokenStorage = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    setToken(token);
    writeToFirestore(token);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed_input = input.trim();

    db.collection(trimmed_input).onSnapshot(function(querySnapshot) {
      if (querySnapshot.empty) {
        alert('Shopping list does not exist');
      } else {
        localStorage.setItem('token', trimmed_input);
        setToken(trimmed_input);
      }
    });
  }

  return (
    <div>
      <h1>Welcome to your Smart Shopping list!</h1>
      <Button
        component={Link}
        variant="contained"
        color="secondary"
        to="/list"
        onClick={setTokenStorage}
      >
        Create New List
      </Button>
      <p>- or -</p>
      <p>Join an existing shopping list by entering a three word token.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="join-list">Enter a share token</label>
        </div>
        <input
          id="join-list"
          onChange={event => setInput(event.target.value)}
        ></input>
        <Button variant="contained" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Welcome;
