import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import {
  Button,
  TextField,
  Grid,
  FormControl,
  Typography,
} from '@material-ui/core';
import { NoPaddingClearIcon } from './ClearIconButton.js';

const Welcome = ({ setToken }) => {
  const [input, setInput] = useState('');

  const setTokenStorage = e => {
    e.preventDefault();
    // const token = getToken();
    // localStorage.setItem('token', token);
    // setToken(token);
    // writeToFirestore(token);
    console.log('Creating new lists is no longer supported.');
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

  /** Using this alert instead of the ArchivalNoticeModal due to legacy deps */
  useEffect(() => {
    alert(
      'This Smart Shopping List App was made by early-career developers at The Collab Lab. This project has now been archived. To view the demo shopping list, enter the three word token: the collab lab. The following features are no longer supported: creating new lists, adding & deleting items from the list, and marking items on the list as purchased.',
    );
  }, []);

  return (
    <Grid
      container
      style={{ height: '100%' }}
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h4">Welcome!</Typography>
        <Typography variant="h6">Create a new Smart Shopping List</Typography>
      </Grid>
      <Grid item>
        <Button
          component={Link}
          variant="contained"
          color="secondary"
          to="/list"
          onClick={setTokenStorage}
          style={{
            height: '50px',
            width: '228.2px',
          }}
        >
          <Typography variant="button">Create New List</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h6">- or -</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">Join a Shopping List.</Typography>
        <Typography variant="h6">Enter a three word token</Typography>
      </Grid>
      <Grid item>
        <FormControl component="form" onSubmit={handleSubmit}>
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
          <Button
            style={{
              marginTop: '4px',
              height: '50px',
            }}
            disabled={!input}
            variant="contained"
            color="secondary"
            type="submit"
          >
            <Typography variant="button">Submit</Typography>
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Welcome;
