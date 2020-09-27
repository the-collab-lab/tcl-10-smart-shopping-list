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
          color="secondary"
          size="small"
          type="submit"
          onClick={copy}
          startIcon={<AssignmentIcon />}
          aria-label={`copy list token: ${token}`}
        >
          Copy
        </Button>
      </DialogContent>
    </div>
  );
};

export default CopyModal;
