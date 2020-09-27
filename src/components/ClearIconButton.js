import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ClearIconButton = p => {
  return (
    <IconButton {...p}>
      <ClearIcon />
    </IconButton>
  );
};

export const NoPaddingClearIcon = withStyles({
  root: {
    padding: 0,
  },
})(props => ClearIconButton(props));
