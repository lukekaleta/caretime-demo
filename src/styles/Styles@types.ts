import { SimplePaletteColorOptions } from '@mui/material';

/**
 * Coloring types
 */
export enum Coloring {
    None = 'none',
    // main coloring
    Blue = 'blue',
    Cyan = 'cyan',
    Navy = 'navy',
    Red = 'red',
    Purple = 'purple',
    Pink = 'pink',
    Green = 'green',
    Orange = 'orange',
    Black = 'black',
    Grey = 'grey',
    White = 'white',
    Night = 'night',
    Shade = 'shade',
    Salmon = 'salmon',
    Gold = 'gold',
    // light coloring
    GreyLight = 'grey-light',
    // dark coloring
    BlueDark = 'blue-dark',
    CyanDark = 'cyan-dark',
    NavyDark = 'navy-dark',
    RedDark = 'red-dark',
    PurpleDark = 'purple-dark',
    PinkDark = 'pink-dark',
    GreenDark = 'green-dark',
    OrangeDark = 'orange-dark',
    BlackDark = 'black-dark',
    GreyDark = 'grey-dark',
    WhiteDark = 'white-dark',
    NightDark = 'night-dark',
    ShadeDark = 'shade-dark',
    // light coloring
    RedLight = 'red-light',
    // others
    Transparent = 'transparent',
    Rainbow = 'rainbow',
}

export interface ThemeColor {
    primary: SimplePaletteColorOptions;
    secondary: SimplePaletteColorOptions;
    red: SimplePaletteColorOptions;
    green: SimplePaletteColorOptions;
    orange: SimplePaletteColorOptions;
    black: SimplePaletteColorOptions;
    white: SimplePaletteColorOptions;
    grey: SimplePaletteColorOptions;
}

export enum Themes {
    dark = 'dark',
    light = 'light',
}
