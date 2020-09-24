import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import AssignmentIcon from '@material-ui/icons/Assignment';

const CopyModal = ({ token, setOpenCopy }) => {
  function copy() {
    const copyText = document.getElementById('share-token');
    copyText.select();
    document.execCommand('copy');
    setOpenCopy(false);
  }

  return (
    <div>
      <DialogContent>
        <TextField
          id="share-token"
          autoFocus
          margin="dense"
          name="share-token"
          label="Share token"
          type="text"
          fullWidth
          value={token}
        />
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: '20px' }}
          color="primary"
          size="small"
          type="submit"
          onClick={copy}
          startIcon={<AssignmentIcon />}
        >
          Copy
        </Button>
      </DialogContent>
    </div>
  );
};

export default CopyModal;
