import React from 'react'
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import toMui from "./to-mui"
import { useThemeUI } from "theme-ui"

const MaterialUIProvider = ({ children }) => {
    const { theme: tuiTheme, colorMode } = useThemeUI()
    const muiTheme = toMui(tuiTheme, colorMode)

    return (
        <MuiThemeProvider theme={muiTheme}>
            {children}
        </MuiThemeProvider>
    )
}

export default MaterialUIProvider