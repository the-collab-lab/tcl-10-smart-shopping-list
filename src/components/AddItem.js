import React, { useState } from 'react';
import { writeToFirestore, timestamp } from '../lib/firebase';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  fieldset: {
    border: '2px solid black',
    padding: '20px',
  },
  legend: {
    padding: '15px 0',
  },
});

const AddItem = ({ token, results }) => {
  let [name, setName] = useState('');
  let [frequency, setFrequency] = useState(604800000);

  const isMoreThan600px = useMediaQuery('(min-width: 600px');

  const classes = useStyles();

  function handleSubmitForm(event) {
    event.preventDefault();

    if (
      results.filter(
        result =>
          name.replace(/[\W_]/g, '').toLowerCase() ===
          result.name.replace(/[\W_]/g, '').toLowerCase(),
      ).length
    ) {
      alert(`${name} already exists on your list.`);
    } else {
      writeToFirestore(token, {
        name,
        frequency,
        addedDate: timestamp,
        purchaseDates: [],
      });
      alert(`${name} has been successfully added to your list.`);
      setName('');
      setFrequency(604800000);
    }
  }

  function handleSetFrequency(event) {
    setFrequency(Number(event.target.value));
  }

  return (
    <form onSubmit={event => handleSubmitForm(event)}>
      <label htmlFor="add-shopping-list-item">Item Name</label>
      <input
        required
        value={name}
        onChange={e => setName(e.target.value)}
        id="add-shopping-list-item"
      />
      <FormControl component="fieldset">
        <FormLabel className={classes.legend} component="legend">
          <Typography variant="subtitle1">
            How soon will you buy this again?
          </Typography>
        </FormLabel>
        <RadioGroup
          className={classes.fieldset}
          row={isMoreThan600px}
          aria-label="purchase frequency"
          name="purchaseFrequency"
          value={frequency}
          onChange={handleSetFrequency}
        >
          <FormControlLabel
            value={604800000}
            control={<Radio color="default" />}
            label="Soon"
            id="soon"
            name="frequency"
          />
          <FormControlLabel
            value={1209600000}
            control={<Radio color="default" />}
            label="Kind of Soon"
            id="kind-of-soon"
            name="frequency"
          />
          <FormControlLabel
            value={2592000000}
            control={<Radio color="default" />}
            label="Not Soon"
            id="not-soon"
            name="frequency"
          />
        </RadioGroup>
      </FormControl>
      <button type="submit" onClick={() => setName(name.trim())}>
        Add Item
      </button>
    </form>
  );
};

export default AddItem;
