import React from 'react'
import 'typeface-raleway'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

export const withCustomTheme = (Child: React.ComponentType) => {
  let theme = createTheme({
    typography: {
      fontFamily: 'Raleway, Arial',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Raleway';
            font-style: normal;
            font-display: swap;
            font-weight: 300;
            src: local('Raleway'), format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  });


  theme = responsiveFontSizes(theme);
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <ThemeProvider theme={theme} >
        <Child {...props} />
      </ ThemeProvider>
    )
  }
}