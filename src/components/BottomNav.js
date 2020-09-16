// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//     maxWidth: 500,
//   },
// });

// function BottomNav() {

//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Paper square className={classes.root}>
//       <Tabs
//        value={value}
//                onChange={handleChange}
//                variant="fullWidth"
//                indicatorColor="primary"
//                textColor="primary"
//                aria-label="icon tabs example"
//                >
//           <Tab icon={<FormatListBulletedIcon/>} aria-label="list"  exact to="/list" activeClassName="selected-view"/>

//           <Tab icon={<AddCircleOutlineIcon/>} aria-label="Add" exact to="/add-item" activeClassName="selected-view"/>

//       </Tabs>

//     </Paper>
//   );
// }

// export default BottomNav;

import React from 'react';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 375,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleChangeIndex = (index) => {
  //   setValue(index);
  // };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            icon={<FormatListBulletedIcon />}
            aria-label="list"
            component={Link}
            to="/list"
          />
          <Tab
            icon={<AddCircleOutlineIcon />}
            aria-label="Add"
            component={Link}
            to="/add-item"
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
