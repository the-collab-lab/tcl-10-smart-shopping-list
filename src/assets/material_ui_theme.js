import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#eceef7',
    },
    background: {
      paper: '#fff',
      default: '#dbe2ec',
      //   #005e9e - site
    },
    tab: {
      nav: '#d9a557',
    },
  },
  // typography: {
  //   fontFamily: [
  //     "Noto Sans",
  //     'sans-serif',
  //   ].join(',')
  // },
});

export default theme;
