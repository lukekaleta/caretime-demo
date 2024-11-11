import {
    cyan,
    deepOrange,
    green,
    grey,
    indigo,
    orange,
    pink,
    red,
} from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        orange: Palette['primary'];
        gray: Palette['primary'];
        white: Palette['primary'];
        customBackground: Palette['primary'];
        primaryBackground: Palette['primary'];
        secondaryBackground: Palette['primary'];
    }

    interface PaletteOptions {
        orange?: PaletteOptions['primary'];
        gray?: PaletteOptions['primary'];
        white?: PaletteOptions['primary'];
        customBackground?: PaletteOptions['primary'];
        primaryBackground?: PaletteOptions['primary'];
        secondaryBackground?: PaletteOptions['primary'];
    }
}

export const theme = createTheme({
    shape: {
        borderRadius: 8,
    },
    palette: {
        primary: {
            light: indigo[400],
            main: indigo[600],
            dark: indigo[800],
            contrastText: '#ffffff',
        },
        secondary: {
            light: pink[400],
            main: pink[600],
            dark: pink[800],
            contrastText: '#ffffff',
        },
        success: {
            light: green[400],
            main: green[600],
            dark: green[800],
            contrastText: '#ffffff',
        },
        warning: {
            light: orange[400],
            main: orange[600],
            dark: orange[800],
            contrastText: '#ffffff',
        },
        error: {
            light: red[300],
            main: red[600],
            dark: red[800],
            contrastText: '#ffffff',
        },
        info: {
            light: cyan[400],
            main: cyan[500],
            dark: cyan[700],
            contrastText: '#ffffff',
        },
        orange: {
            light: deepOrange[400],
            main: deepOrange[600],
            dark: deepOrange[800],
            contrastText: '#ffffff',
        },
        gray: {
            light: grey[400],
            main: grey[500],
            dark: grey[700],
            contrastText: '#ffffff',
        },
        white: {
            main: '#FFFFFF',
            contrastText: grey[800],
        },
        customBackground: {
            main: 'rgb(238, 242, 246)',
        },
        primaryBackground: {
            light: indigo[50],
            main: indigo[100],
            dark: indigo[600],
        },
        secondaryBackground: {
            light: pink[50],
            main: pink[100],
            dark: pink[600],
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});
