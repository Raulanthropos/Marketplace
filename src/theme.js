import { createTheme } from "@mui/material";

const marketcyan = "#33cccc";
const marketdarkblue = "#3e5266";
const marketpurple = "#a000a5";
const marketred = "#b00020";
const marketgreen = "#61be2d";
const marketblue = "#292d94";
const marketgrey = "#3d5265";
const marketlightgrey = "#c4c4c4";
const marketothergrey = "#72889F";
const marketfooter1 = "#E3E3E3";
const marketmoss = "#007E7D";
const marketmossvariant = "#005B54";
const marketwarning = "#FFC208";
const marketwhite = "#FFFFFF";
// const marketwarning = '#ffc107'

const textprimary = "#1e2b39";
const textsecondary = "#1e2b39";

export const primary = createTheme({
  palette: {
    primary: { main: marketmoss, contrastText: "#fff" },
  },
});
export const secondary = createTheme({
  palette: {
    primary: { main: marketdarkblue },
  },
});
export const green = createTheme({
  palette: {
    primary: { main: marketgreen, contrastText: "#fff" },
  },
});
export const red = createTheme({
  palette: {
    primary: { main: marketred },
  },
});
export const purple = createTheme({
  palette: {
    primary: { main: marketpurple },
  },
});

export const blue = createTheme({
  palette: {
    primary: { main: marketblue },
  },
});

export const cyan = createTheme({
  palette: {
    primary: { main: marketcyan, contrastText: "#fff" },
  },
});
export const text = createTheme({
  palette: {
    primary: { main: textprimary },
  },
});
export const grey = createTheme({
  palette: {
    primary: { main: marketlightgrey },
  },
});

export const warning = createTheme({
  palette: {
    primary: { main: marketwarning },
  },
});
export const white = createTheme({
  palette: {
    primary: { main: marketwhite, contrastText: "#fff" },
  },
});

export default createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    h1: {
      fontSize: 54,
      fontWeight: "bold",
      fontFamily: "Roboto Slab",
      color: "#FFFFFF",
    },
    h2: {
      fontSize: 36,
      // fontWeight: 'lighter',
      fontWeight: 300,
      fontFamily: "Roboto",
      color: "#000000",
    },
    h3: {
      fontSize: 34,
      fontWeight: "bold",
      fontFamily: "Roboto Slab",
      color: "#007E7D",
    },
    h4: {
      fontSize: 26,
      fontWeight: "normal",
      fontFamily: "Roboto Slab",
      color: "#000000",
    },
    h5: {
      fontSize: 22,
      fontWeight: "normal",
      fontFamily: "Roboto",
      color: "#000000",
    },
    h6: {
      fontSize: 20,
      fontWeight: "normal",
      fontFamily: "Roboto Slab",
      color: "#007E7D",
    },
    h7: {
      fontSize: 18,
      fontWeight: "normal",
      fontFamily: "Roboto Slab",
      color: "#000000",
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: "Roboto",
      color: "#000000",
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: "500",
      fontFamily: "Roboto",
      color: "#000000",
    },
    subtitle3: {
      fontSize: 14,
      // fontWeight: 'lighter',
      fontWeight: 300,
      fontFamily: "Roboto",
      color: "#000000",
    },
    body1: {
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: "Roboto",
      color: "#000000",
    },
    body2: {
      fontSize: 14,
      fontWeight: "500",
      fontFamily: "Roboto",
      color: "#000000",
    },
    caption: {
      fontFamily: "Roboto",
      fontWeight: "normal",
      color: "#000000",
      fontSize: 12,
    },
    overline: {
      fontFamily: "Roboto",
      fontWeight: "normal",
      color: "#A000A5",
      fontSize: 12,
      textTransform: "uppercase",
    },

    fontFamily: ["Roboto", "Roboto Slab"].join(","),
    mainbutton: {
      // width: '4rem',
      minWidth: "10rem",
      borderRadius: "50px",
      // minHeight: '2rem',
      padding: `0.5rem 1.2rem`,
      color: "default",
    },
    mainbuttonsmall: {
      //   width: theme.spacing(4),
      //   minWidth: theme.spacing(20),
      //   borderRadius: theme.spacing(4),
      //   padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
      //   margin: theme.spacing(2, 0),
      // minWidth: '4rem',
      minWidth: "8rem",
      borderRadius: "50px",
      minHeight: "1.8rem",
      // padding: `0.5rem 1rem`,
      padding: `0.6rem 1.8rem`,
    },
    mainlogo: {
      top: `calc(0% - 50px)`,
      left: `calc(50% - 50px)`,
      width: "100px",
      height: "100px",
      color: "white",
      backgroundColor: `${marketcyan}`,
      // boxShadow: `${baseShadow}`,
    },
    bottomtext: {
      fontWeight: "bold",
      fontSize: 18,
      color: `${marketdarkblue}`,
    },
    // bottomlink: {
    //   fontSize: 12,
    //   color: `${marketdarkblue}`,
    // },
    inputicon: {
      // margin: '6px 0',
      marginBottom: 28, //30
      fontSize: 24,
      // color: `${marketgrey}`,
    },
    gridIcon: {
      marginBottom: 22, //30
      // fontSize: 24,
      // color: `${marketgrey}`,
    },
  },
  palette: {
    common: {
      marketcyan: `${marketcyan}`,
      marketdarkblue: `${marketdarkblue}`,
      marketpurple: `${marketpurple}`,
      marketred: `${marketred}`,
      marketgreen: `${marketgreen}`,
      marketblue: `${marketblue}`,
      marketgrey: `${marketgrey}`,
      marketothergrey: `${marketothergrey}`,
      marketlightgrey: `${marketlightgrey}`,
      marketmoss: `${marketmoss}`,
      marketmossvariant: `${marketmossvariant}`,
      textprimary: `${textprimary}`,
      textsecondary: `${textsecondary}`,
      marketfooter1: `${marketfooter1}`,
      marketwarning: `${marketwarning}`,
      marketwhite: `${marketwhite}`,
    },
    error: {
      main: `${marketred}`,
    },
    primary: {
      main: `${marketmoss}`,
      contrastText: "#fff",
    },
    secondary: {
      main: `${marketdarkblue}`,
    },
    tertiary: {
      main: `${marketpurple}`,
    },
    quaternary: {
      main: `${marketred}`,
    },
    quinary: {
      main: `${marketmossvariant}`,
    },
    cyan: {
      main: `${marketcyan}`,
      contrastText: "#fff",
    },
  },
  //   status: {
  //     danger: '#e53e3e',
  //   },
});
