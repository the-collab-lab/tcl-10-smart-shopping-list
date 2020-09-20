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
      paper: '#f5f5f5',
      default: '#dbe2ec',
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
