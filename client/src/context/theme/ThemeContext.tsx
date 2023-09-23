import React, {createContext, useState, Dispatch, SetStateAction } from "react";
import {Theme, ThemeType, THEMES} from "./Theme.config";

interface ThemeContextProps {
    theme: ThemeType;
    themeColors: Theme;
    setTheme: Dispatch<SetStateAction<ThemeType>>;
}

interface ChildrenProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps>({theme: 'light', themeColors: THEMES['light']} as ThemeContextProps);

export const ThemeProvider: React.FC<ChildrenProps> = ({children}) => {

    let defaultThemeValue:ThemeType = 'light'

    if(localStorage.getItem('ALXTheme')) {
        defaultThemeValue = JSON.parse(localStorage.getItem('ALXTheme')!)
    }

    const [theme, setTheme] = useState<ThemeType>(defaultThemeValue);

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            themeColors: THEMES[theme],
            setTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext);