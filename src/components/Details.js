import React from 'react';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { IconButton, DialogContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles({
  button: {
    color: 'black',
    alignSelf: 'start',
  },
});

const Details = ({ activeItem, setOpenDetails }) => {
  const classes = useStyles();

  const numOfPurch = activeItem.purchaseDates.length;
  const lastPurch = numOfPurch
    ? Math.max(...activeItem.purchaseDates)
    : activeItem.addedDate;
  const futurePurch = lastPurch + activeItem.frequency;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getTime = date => {
    const fullDate = new Date(date);
    const dateArray = [
      fullDate.getFullYear() /*year*/,
      months[fullDate.getMonth()] /*month string*/,
      fullDate.getDate() /*date*/,
    ];
    return `${dateArray[1]} ${dateArray[2]}, ${dateArray[0]}`;
  };

  return (
    <DialogContent style={{ maxWidth: '350px', paddingBottom: '2em' }}>
      {/* dialog maxWdith for demo */}
      <Helmet>
        <title>Item Details</title>
        <meta
          name="description"
          content={`Item details for item: ${activeItem.name}`}
        />
      </Helmet>
      <IconButton
        aria-label="back to list"
        onClick={() => setOpenDetails(false)}
        color="secondary"
        className={classes.button}
        size="medium"
      >
        <ChevronLeftRoundedIcon />
      </IconButton>
      <Typography variant="h5" style={{ marginBottom: '.5em' }} align="center">
        Smart Shopping List
      </Typography>
      <Typography
        variant="h6"
        align="center"
        style={{ textDecoration: 'underline' }}
      >
        Item
      </Typography>
      <Typography variant="h6" align="center">
        {activeItem.name}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        style={{ textDecoration: 'underline' }}
      >
        Last Purchase Date
      </Typography>
      <Typography variant="h6" align="center">
        {numOfPurch ? getTime(lastPurch) : 'No Purchase History'}{' '}
      </Typography>

      <Typography
        variant="h6"
        align="center"
        style={{ textDecoration: 'underline' }}
      >
        Next Purchase Date
      </Typography>
      <Typography variant="h6" align="center">
        {getTime(futurePurch)}{' '}
      </Typography>
      <Typography variant="h6" align="center">
        <strong>
          You have purchased this item {numOfPurch} time
          {numOfPurch === 1 ? null : 's'}.
        </strong>
      </Typography>
    </DialogContent>
  );
};

export default Details;
