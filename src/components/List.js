import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Details from './Details';
import { updatePurchaseDate } from '../lib/firebase.js';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green, orange, red, grey } from '@material-ui/core/colors';
import {
  FormControlLabel,
  Checkbox,
  IconButton,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Box,
  Dialog,
  Button,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import SearchIcon from '@material-ui/icons/Search';
import { NoPaddingClearIcon } from './ClearIconButton.js';
import { Helmet } from 'react-helmet';
import DeleteModal from './DeleteModal';

const useStyles = makeStyles({
  box: {
    height: '48vh',
    overflowY: 'scroll',
  },
});

const DecoratedCheckbox = p => {
  return (
    <Checkbox
      icon={<CircleUnchecked />}
      checkedIcon={<CircleCheckedFilled />}
      color="default"
      {...p}
    />
  );
};

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => DecoratedCheckbox(props));

const OrangeCheckbox = withStyles({
  root: {
    color: orange[400],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})(props => DecoratedCheckbox(props));

const RedCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})(props => DecoratedCheckbox(props));

const GreyCheckbox = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600],
    },
  },
  checked: {},
})(props => DecoratedCheckbox(props));

const List = ({ results, setSearchTerm, searchTerm, token }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [activeItem, setActiveItem] = useState({});
  const classes = useStyles();

  function handleOnCheck(event, purchaseDates) {
    updatePurchaseDate(token, event.target.value, purchaseDates);
  }

  function checkTime(time) {
    return Date.now() - time <= 86400000; //number of milliseconds equal to 24 hours
  }

  function handleDelete(result) {
    setActiveItem(result);
    setOpenDeleteModal(true);
  }

  function predictedNextPurchase(lastPurchase, frequency) {
    //takes the last purchase date, frequency, and current date and calculates how many days are there until anticipated purchase date
    return Math.round((lastPurchase + frequency - Date.now()) / 86400000);
  }

  function lastPurchaseDate(result) {
    //if there is a purchase date, it's returning the recent purchase date. Otherwise, returning addedDate
    return result.purchaseDates.length > 0
      ? Math.max(...result.purchaseDates)
      : result.addedDate;
  }

  function sortedResults() {
    let active = [];
    let inactive = [];
    results.forEach(result => {
      //pulls out inactive items - identified by having a negative number less than the negative frequency, or has a frequency greater than 30.
      //for example, if an item has a frequency of 7 days, and the anticpated days left is -8, that means it's been 15 days since the last purchase date, and is inactive
      if (
        predictedNextPurchase(lastPurchaseDate(result), result.frequency) <
          -1 * Math.round(result.frequency / 86400000) ||
        Math.round(result.frequency / 86400000) > 30
      ) {
        result.timeClass = 'inactive';
        inactive.push(result);
      } else {
        active.push(result);

        let predictedPurchase = predictedNextPurchase(
          lastPurchaseDate(result),
          result.frequency,
        );

        switch (true) {
          case predictedPurchase <= 7:
            result.timeClass = 'soon';
            break;
          case predictedPurchase <= 14:
            result.timeClass = 'kind-of-soon';
            break;
          case predictedPurchase <= 30:
            result.timeClass = 'not-soon';
            break;
          default:
            result.timeClass = 'inactive'; //everything above else defaults to inactive
            break;
        }
      }
    });

    //sorts active items alphabetically and by next purchase date
    return [
      ...active
        .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1))
        .sort((a, b) =>
          predictedNextPurchase(lastPurchaseDate(a), a.frequency) >
          predictedNextPurchase(lastPurchaseDate(b), b.frequency)
            ? 1
            : -1,
        ),
      //just sorts inactive items alphabetically. It doesn't make as much sense to sort HOW inactive an item is
      ...inactive.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      ),
    ];
  }

  function getCheckboxWithColor(result, time) {
    //uses timeClasses found above to return the correct color of checkbox
    switch (result.timeClass) {
      case 'soon':
        return (
          <GreenCheckbox
            checked={checkTime(time)}
            onChange={e => handleOnCheck(e, result.purchaseDates)}
            name={result.id}
          />
        );
      case 'kind-of-soon':
        return (
          <OrangeCheckbox
            checked={checkTime(time)}
            onChange={e => handleOnCheck(e, result.purchaseDates)}
            name={result.id}
          />
        );
      case 'not-soon':
        return (
          <RedCheckbox
            checked={checkTime(time)}
            onChange={e => handleOnCheck(e, result.purchaseDates)}
            name={result.id}
          />
        );
      default:
        return (
          <GreyCheckbox
            checked={checkTime(time)}
            onChange={e => handleOnCheck(e, result.purchaseDates)}
            name={result.id}
          />
        );
    }
  }

  const getEndSearchIcon = () => {
    if (searchTerm === '') {
      return <SearchIcon />;
    } else {
      return <NoPaddingClearIcon onClick={() => setSearchTerm('')} />;
    }
  };

  const handleOnClickDetails = result => {
    setActiveItem(result);
    setOpenDetails(true);
  };

  return (
    <Grid
      container
      style={{ height: results.length ? '100%' : '50%', width: '100%' }}
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Helmet>
        <title>Your Shopping List</title>
        <meta
          name="description"
          content={`Your shopping list items with token: ${token}`}
        />
      </Helmet>
      <header>
        <Typography variant="h4">Smart Shopping List</Typography>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 'bold', marginTop: '2em' }}
        >
          Share Token: {token}
        </Typography>
      </header>
      {results.length === 0 ? (
        <Box>
          <Typography variant="h6">
            Your shopping list is currently empty.
          </Typography>
          <Button
            component={NavLink}
            to="/add-item"
            style={{
              marginTop: '1em',
              marginBottom: '1em',
              height: '50px',
              width: '228.2px',
            }}
            variant="contained"
            color="secondary"
          >
            <Typography variant="h6">Add Item</Typography>
          </Button>
        </Box>
      ) : (
        <div style={{ width: '100%' }}>
          <TextField
            style={{ width: '100%' }}
            variant="outlined"
            label="Search"
            id="search-field"
            onChange={event => setSearchTerm(event.target.value)}
            value={searchTerm}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {getEndSearchIcon()}
                </InputAdornment>
              ),
            }}
          />
          <Box className={classes.box}>
            <ul>
              {sortedResults()
                .filter(result =>
                  result.name
                    .toLowerCase()
                    .replace(/[\W_]/g, '')
                    .includes(searchTerm.toLowerCase()),
                )
                .map(result => {
                  const time = Math.max(...result.purchaseDates); //pulls most recent purchase date
                  return (
                    <li
                      key={result.id}
                      className={checkTime(time) ? `deactivated` : null}
                    >
                      <Paper // adds background color. If we don't want a shadow, we can set elevation to 0
                        elevation={1}
                        className="list-item"
                        style={{ margin: '.2em' }}
                      >
                        <Grid // used to align labe/checkbox with icon buttons and to properly space
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          className="container"
                        >
                          <Grid item>
                            <FormControlLabel
                              control={getCheckboxWithColor(result, time)} //sends to above function to pull back the correct color checkbox component
                              label={result.name}
                              disabled={checkTime(time)}
                              id={result.id}
                              value={result.id}
                              aria-label={result.timeClass.split('-').join(' ')}
                            />
                          </Grid>
                          <Grid item>
                            <IconButton
                              onClick={() => handleOnClickDetails(result)}
                              color="primary"
                              aria-label={`${result.name} details`}
                              component="span"
                            >
                              <MoreHorizIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(result)}
                              color="primary"
                              aria-label={`delete ${result.name}`}
                              component="span"
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Paper>
                    </li>
                  );
                })}
            </ul>
            <Dialog
              open={openDetails}
              onClose={() => setOpenDetails(false)}
              aria-label="see item details"
            >
              <Details
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                setOpenDetails={setOpenDetails}
              />
            </Dialog>
            <Dialog
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              aria-label="delete item"
            >
              <DeleteModal
                activeItem={activeItem}
                token={token}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </Dialog>
          </Box>
        </div>
      )}
    </Grid>
  );
};

export default List;
