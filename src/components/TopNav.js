import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CopyModal from './CopyModal';

function TopNav({ token, setToken }) {
  const history = useHistory();
  const [openCopy, setOpenCopy] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    history.push('/');
  };

  return (
    <div>
      <Dialog
        open={openCopy}
        onClose={() => setOpenCopy(false)}
        aria-labelledby="make-copy-dialog"
      >
        <CopyModal token={token} setOpenCopy={setOpenCopy} />
      </Dialog>
      <AppBar position="static" style={{ height: '65px' }}>
        <Toolbar
          style={{
            padding: '.5rem',
            height: '100%',
          }}
        >
          <Grid container justify="space-between">
            <Grid item style={{ alignSelf: 'center' }}>
              <Grid
                container
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <img
                    alt="CartVoyant Logo"
                    src={require('../assets/crystal_ball_logo.svg')}
                    style={{ width: '2rem', height: 'auto' }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6">CartVoyant</Typography>
                </Grid>
              </Grid>
            </Grid>
            {token ? (
              <Grid item>
                <Grid container justify="flex-end">
                  <Grid item>
                    <IconButton
                      onClick={() => setOpenCopy(true)}
                      aria-label={`copy list token`}
                    >
                      <GroupAddIcon style={{ color: '#ffffff' }} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleLogOut} aria-label="exit list">
                      <ExitToAppIcon style={{ color: '#ffffff' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopNav;
