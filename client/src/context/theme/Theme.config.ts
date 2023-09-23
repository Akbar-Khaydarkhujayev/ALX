export interface Theme {
    '--primary': string;
    '--secondary': string;
    '--hover': string;
    '--accent': string;
    '--background-secondary': string,
    '--background': string;
}

export type ThemeType = 'light' | 'dark';

export const THEMES: Record<ThemeType, Theme> = {
    light: {
        '--primary': '#212529',
        '--secondary': '#959eaa',
        '--hover': '#e5351e',
        '--accent': '#2684FF',
        '--background': '#E8E8E8',
        '--background-secondary': '#ffffff',
    },
    dark: {
        '--primary': '#ffffff',
        '--secondary': '#959eaa',
        '--hover': '#e5351e',
        '--accent': '#2684FF',
        '--background': '#242629',
        '--background-secondary': '#16161a',
    }
};