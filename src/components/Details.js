import React from 'react';
import ReactDOM from 'react-dom';
import isEmpty from 'lodash/isEmpty';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import RestoreIcon from '@material-ui/icons/Restore';
import UpdateIcon from '@material-ui/icons/Update';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const Details = ({ details, setDetails }) => {
  const numOfPurch = details.purchaseDates.length;
  const lastPurch = numOfPurch
    ? Math.max(...details.purchaseDates)
    : details.addedDate;
  const futurePurch = lastPurch + details.frequency;

  const getTime = date => {
    const fullDate = new Date(date);
    const displayedDate = fullDate.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return displayedDate;
  };

  const body = (
    <>
      <DialogTitle id="dialog-title">
        Item Details for "{details.name}"
      </DialogTitle>
      <DialogContent dividers={true}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <RestoreIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Last purchase date"
              secondary={
                numOfPurch
                  ? getTime(lastPurch)
                  : 'This item has no purchase history'
              }
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <UpdateIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Next purchase date"
              secondary={getTime(futurePurch)}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PlaylistAddCheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Number of purchases"
              secondary={numOfPurch}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDetails({})} color="primary">
          Back
        </Button>
      </DialogActions>
    </>
  );

  return ReactDOM.createPortal(
    <Dialog
      open={!isEmpty(details)}
      onClose={() => setDetails({})}
      onBackdropClick={() => setDetails({})}
      aria-labelledby="dialog-title"
    >
      {body}
    </Dialog>,
    document.body,
  );
};

export default Details;
