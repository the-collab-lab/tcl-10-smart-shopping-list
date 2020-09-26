import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function FullWidthTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="main navigation tabs"
        >
          <Tab
            icon={<FormatListBulletedIcon />}
            aria-label="shopping list"
            component={Link}
            to="/list"
          />
          <Tab
            icon={<AddCircleOutlineIcon />}
            aria-label="Add item to shopping list"
            component={Link}
            to="/add-item"
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
