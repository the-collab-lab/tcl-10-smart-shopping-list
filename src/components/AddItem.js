import React, { useState } from 'react';
import { writeToFirestore, timestamp } from '../lib/firebase';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Divider,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  caption: {
    color: grey[600],
    textAlign: 'left',
  },
  formControlLabel: {
    justifyContent: 'space-between',
    margin: 0,
  },
});

const AddItem = ({ token, results }) => {
  let [name, setName] = useState('');
  let [frequency, setFrequency] = useState(604800000);

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
      <Box>
        <Box>
          <label htmlFor="add-shopping-list-item">Item Name</label>
        </Box>
        <input
          required
          value={name}
          onChange={e => setName(e.target.value)}
          id="add-shopping-list-item"
        />
      </Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          <Typography variant="subtitle1">
            When will you purchase this item?
          </Typography>
        </FormLabel>
        <RadioGroup
          defaultValue={604800000}
          aria-label="purchase frequency"
          name="purchase-frequency"
          value={frequency}
          onChange={handleSetFrequency}
        >
          <FormControlLabel
            value={604800000}
            control={<Radio color="default" />}
            label="Soon"
            id="soon"
            name="frequency"
            labelPlacement={'start'}
            className={classes.formControlLabel}
          />
          <Typography className={classes.caption} variant="caption">
            Within 7 days
          </Typography>
          <Divider />
          <FormControlLabel
            value={1209600000}
            control={<Radio color="default" />}
            label="Kind of Soon"
            id="kind-of-soon"
            name="frequency"
            labelPlacement="start"
            className={classes.formControlLabel}
          />
          <Typography className={classes.caption} variant="caption">
            More than 7 days, less than 14 days
          </Typography>
          <Divider />
          <FormControlLabel
            value={2592000000}
            control={<Radio color="default" />}
            label="Not Soon"
            id="not-soon"
            name="frequency"
            labelPlacement="start"
            className={classes.formControlLabel}
          />
          <Typography className={classes.caption} variant="caption">
            More than 14 days, less than 30 days
          </Typography>
          <Divider />
        </RadioGroup>
      </FormControl>
      <Box>
        <button type="submit" onClick={() => setName(name.trim())}>
          Add Item
        </button>
      </Box>
    </form>
  );
};

export default AddItem;
