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
  TextField,
  Button,
  Snackbar,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Helmet } from 'react-helmet';
import WarningIcon from '@material-ui/icons/Warning';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
  let [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  let [openAlreadyExistsAlert, setOpenAlreadyExistsAlert] = useState(false);

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
      setOpenAlreadyExistsAlert(true);
    } else {
      writeToFirestore(token, {
        name,
        frequency,
        addedDate: timestamp,
        purchaseDates: [],
      });
      setOpenSuccessAlert(true);
      setName('');
      setFrequency(604800000);
    }
  }

  function handleSetFrequency(event) {
    setFrequency(Number(event.target.value));
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Add Item</title>
        <meta
          name="description"
          content={`Add item to shopping list with token: ${token}`}
        />
      </Helmet>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessAlert(false)}
        message={`Successfully added ${name}to your list.`}
        action={<CheckBoxIcon />}
        role="alert"
        aria-label={`Successfully added ${name}to your list.`}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openAlreadyExistsAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlreadyExistsAlert(false)}
        message={`${name} already exists on your list.`}
        action={<WarningIcon />}
        role="alert"
        aria-label={`${name} already exists on your list.`}
      />
      <Grid
        style={{ height: '100%' }}
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <FormControl
          style={{ height: '100%' }}
          component="form"
          onSubmit={event => handleSubmitForm(event)}
        >
          <Grid item>
            <header>
              <Typography variant="h4">Smart Shopping List</Typography>
              <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                Share Token: {token}
              </Typography>
            </header>
          </Grid>
          <Grid item>
            <TextField
              required
              id="add-shopping-list-item"
              variant="outlined"
              label="Item Name"
              onChange={e => setName(e.target.value)}
              value={name}
              style={{ margin: '2em' }}
            />
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
            <Box style={{ margin: '2em' }}>
              <Button
                type="submit"
                onClick={() => setName(name.trim())}
                size="large"
                variant="contained"
                color="secondary"
              >
                <Typography>Add To List</Typography>
              </Button>
            </Box>
          </Grid>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
};

export default AddItem;
