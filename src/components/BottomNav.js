import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from '@material-ui/core/Box';

export default function FullWidthTabs() {
  const [tabNumber, setTabNumber] = React.useState(0);

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Tabs
          value={tabNumber}
          onChange={setTabNumber}
          indicatorColor="secondary"
          variant="fullWidth"
          aria-label="main navigation tabs"
        >
          <Tab
            icon={<FormatListBulletedIcon />}
            aria-label="shopping list"
            component={Link}
            to="/list"
            style={{ borderRight: '0.1em solid white' }}
          />
          <Tab
            icon={<AddCircleOutlineIcon />}
            aria-label="Add item to shopping list"
            component={Link}
            to="/add-item"
          />
        </Tabs>
      </AppBar>
    </Box>
  );
}
