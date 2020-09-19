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
