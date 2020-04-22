import React from 'react'
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import toMui from "./to-mui"
import { useThemeUI } from "theme-ui"

const MaterialUIProvider = ({ children }) => {
    const { theme: tuiTheme, colorMode } = useThemeUI()
    const muiTheme = toMui(tuiTheme, colorMode)
    const theme = createMuiTheme(muiTheme)

    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    )
}

export default MaterialUIProvider