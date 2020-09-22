import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import getToken from '../lib/tokens';
import { writeToFirestore, db } from '../lib/firebase';
import { TextField } from '@material-ui/core';
import { NoPaddingClearIcon } from './ClearIconButton.js';

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
      <Link to="/list" onClick={setTokenStorage}>
        Create New List
      </Link>
      <p>- or -</p>
      <p>Join an existing shopping list by entering a three word token.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="join-list">Enter a share token</label>
        </div>
        <TextField
          label="Enter Token"
          variant="outlined"
          id="join-list"
          onChange={event => setInput(event.target.value)}
          value={input}
          InputProps={{
            endAdornment: <NoPaddingClearIcon onClick={() => setInput('')} />,
          }}
        ></TextField>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Welcome;
