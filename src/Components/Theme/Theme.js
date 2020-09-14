import { createMuiTheme } from '@material-ui/core/styles';


const myTheme = createMuiTheme({
    overrides: {
 
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        fontFamily: "yekan",
    },
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: "#ff1744"
        },
    },
});

export default myTheme;