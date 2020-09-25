import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333333', //black
    },
    secondary: {
      main: '#551a8b', //dark purple
      //main: '#aa8dd8', light purple
    },
    background: {
      paper: '#f5f5f5',
      default: '#aa8dd8', //light purple
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
