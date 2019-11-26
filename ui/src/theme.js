import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import brixsans from './fonts/EON_BrixSansWeb-Regular.woff2';

const theme = createMuiTheme({
 typography: {
    fontFamily: 'EONBrixSans',
  },
    palette: {
      primary: {
        main: "#ea1c0a",
        light: "#ea1c0a"
      },
      secondary: {
        main: "#1ea2b1"
      },
    },
});

  
export default theme;
