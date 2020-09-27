import React from 'react';
import { Button, Grid } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { deleteItem } from '../lib/firebase.js';
import { Typography } from '@material-ui/core';

const DeleteModal = ({ activeItem, setOpenDeleteModal, token }) => {
  const handleDelete = () => {
    deleteItem(token, activeItem.id);
    setOpenDeleteModal(false);
  };

  return (
    <div>
      {/* maxWdith for demo */}
      <DialogContent style={{ maxWidth: '350px' }}>
        <Typography variant="h6">{`Permanently remove "${activeItem.name}" from your shopping list?`}</Typography>
        <Typography variant="h6">
          You cannot undo this action, and this item's purchase history will be
          lost.
        </Typography>
        <Grid container justify="flex-end" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              style={{ marginTop: '20px' }}
              color="secondary"
              size="small"
              type="submit"
              onClick={handleDelete}
              aria-label={`Delete ${activeItem.name}`}
            >
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={{ marginTop: '20px' }}
              color="primary"
              size="small"
              onClick={() => setOpenDeleteModal(false)}
              aria-label={'Cancel'}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </div>
  );
};

export default DeleteModal;
