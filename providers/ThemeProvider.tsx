import React from "react";
import { 
    createTheme, 
    ThemeProvider as MuiThemeProvider,
    PaletteOptions,
    ThemeOptions,
    PaletteColorOptions, 
} from "@mui/material";
import { ReactChild } from "react";
import { darkTheme, generalTheme, IGeneralTheme, ITheme } from "../constants/theme";

interface ThemeProviderProps {
    children: ReactChild;
}

export interface AggumentedPaletteOptions {
    general: IGeneralTheme;
    primary: { main: string; } & PaletteColorOptions;
    secondary: { main: string } & PaletteColorOptions;
    theme: ITheme;
}

declare module '@mui/material' {
    interface PaletteOptions extends AggumentedPaletteOptions {}
}

declare module "@mui/styles" {
    interface PaletteColorOptions {
        main: string; 
    }
    interface DefaultTheme extends ThemeOptions{
        palette: AggumentedPaletteOptions & PaletteOptions 
    }
}

const ThemeProvider : React.FC<ThemeProviderProps> = ({ children }) => {
    const theme = React.useMemo(() => (
        createTheme({
            palette: {
                primary: {
                    main: "#242538",
                },
                secondary: {
                    main: "#F5F5DC"
                },
                grey: {
                    "700": "rgba(39, 39, 42, 1)",
                },
                common: {
                    
                },
                theme: darkTheme,
                general: generalTheme
            },
        })
    ), [])

    return (
        <MuiThemeProvider theme={theme}>
            { children }
        </MuiThemeProvider>
    )
};

export default ThemeProvider;