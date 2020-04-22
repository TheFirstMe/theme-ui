const toMuiBp = (tuiBp) => {
    // use Material UI defaults if breakpoints is not provided
    if (tuiBp && !tuiBp.length) return {}

    // store breakpoints for Material UI here
    const muiBpValues = {}

    const muiBpKeys = ["xs", "sm", "md", "lg", "xl"]

    // Theme UI allows array of breakpoint values
    // Material UI requires (key, value) pair of breakpoint values
    muiBpKeys.forEach((key, i) => {
        muiBpValues[key] = tuiBp[i]
    })

    // Material UI value for breakpoints key
    return {
        keys: muiBpKeys,
        values: muiBpValues,
    }
}

const toMuiColors = (tuiColors, tuiMode) => {
    // use Material UI defaults if colors is not provided
    if (!tuiColors) return {}

    const {
        // palette.common
        white,
        black,

        text,
        // palette.text
        textPrimary = text,
        textSecondary,
        textDisabled,
        textHint,
        // palette.divider
        divider,

        background,
        // palette.background
        backgroundDefault = background,
        backgroundPaper,
        // palette.action
        action = {},
        ...rest
    } = tuiColors

    // intentions used by Material UI
    const intentions = ["primary", "secondary", "error", "warning", "info", "success"]
    // store colors for Material UI here
    const muiColors = {}

    // set Material color mode based on Theme UI color mode
    muiColors.type = tuiMode === ('default' || 'light') ? 'light' : 'dark'

    if (white || black) {
        // set palette.common if white and/or black is defined in Theme UI theme
        muiColors.common = {
            ...(white ? { white: white } : {}),
            ...(black ? { black: black } : {})
        }
    }

    intentions.forEach((intention) => {
        // if intention is not defined in Theme UI, skip it
        if (!rest[intention]) return

        // set optional intention values for Material UI if defined in Theme UI theme 
        muiColors[intention] = {
            ...(rest[`${intention}Light`] ? { light: rest[`${intention}Light`] } : {}),
            ...(rest[intention] ? { main: rest[intention] } : {}),
            ...(rest[`${intention}Dark`] ? { dark: rest[`${intention}Dark`] } : {}),
            ...(rest[`${intention}ContrastText`] ? { contrastText: rest[`${intention}ContrastText`] } : {}),
        }
    })

    // color mode options for Theme UI
    if (textPrimary) {
        // set palette.text
        muiColors.text = {
            primary: textPrimary,
            ...(textSecondary ? { secondary: textSecondary } : {}),
            ...(textDisabled ? { disabled: textDisabled } : {}),
            ...(textHint ? { hint: textHint } : {})
        }
    }

    if (backgroundDefault) {
        // set palette.background
        muiColors.background = {
            default: backgroundDefault,
            ...(backgroundPaper ? { paper: backgroundPaper } : {})
        }
    }

    if (divider) {
        // set palette.divider
        muiColors.divider = divider
    }

    if (action) {
        //set palette.action
        muiColors.action = action
    }

    return muiColors
}

const toMuiTyp = (tuiTyp) => {
    // use Material UI defaults if typography is not provided
    if (!tuiTyp) return

    // destructuring for setting Material UI typography
    const {
        tuiFonts = {},
        tuiFontSizes = {},
        tuiFontWeights = {},
        tuiLineHeights = {},
        tuiLetterSpacings = {},
        tuiStyles = {},
    } = tuiTyp

    // Material UI custom fields
    const { default: fontFamily } = tuiFonts
    const { htmlFontSize } = tuiFontSizes

    // font weights used by Material UI
    const fontWeights = ["light", "regular", "medium", "bold"]
    // variants used by Material UI
    // this list is incomplete
    const variants = ["h1", "h2", "h3", "h4", "h5", "h6"]
    const muiFontWeights = {}, muiVariants = {}

    fontWeights.forEach((fontWeight) => {
        // set Material UI font weights if defined in Theme UI theme
        if (!tuiFontWeights[fontWeight]) return

        muiFontWeights[fontWeight] = tuiFontWeights[fontWeight]
    })


    variants.forEach((variant) => {
        // set Material UI variants if defined in Theme UI theme
        // only supports h1 ... h6 currently
        let v
        if (!tuiStyles[variant]) return

        v = tuiStyles[variant]
        const {
            fontFamily: ff,
            fontWeight: fw,
            fontSize: fs,
            lineHeight: lh,
            letterSpacing: ls,
        } = v

        muiVariants[variant] = {
            ...(ff ? { fontFamily: tuiFonts[ff] || ff } : {}),
            ...(fw ? { fontWeight: tuiFontWeights[fw] || fw } : {}),
            ...(fs ? { fontSize: tuiFontSizes[fs] || fs } : {}),
            ...(lh ? { lineHeight: tuiLineHeights[lh] || lh } : {}),
            ...(ls ? { letterSpacing: tuiLetterSpacings[ls] || ls } : {})
        }
    })

    // Material UI value for typography key
    return {
        ...(htmlFontSize ? { htmlFontSize: htmlFontSize } : {}),
        ...(fontFamily ? { fontFamily: fontFamily } : {}),
        ...muiFontWeights,
        ...muiVariants,
    }
}

const toMuiSpace = (tuiSpace) => {
    // use Material UI defaults if space is not provided or is not an array
    if (!tuiSpace || !tuiSpace.length) return []

    return tuiSpace
}

const toMui = (tuiTheme, tuiMode = 'light') => {
    // destructure Material UI relevant fields
    const {
        colors: tuiColors,
        breakpoints: tuiBp,
        fonts: tuiFonts,
        fontSizes: tuiFontSizes,
        fontWeights: tuiFontWeights,
        lineHeights: tuiLineHeights,
        space: tuiSpace,
        styles: tuiStyles,
        zIndices,
        ...rest
    } = tuiTheme

    // Material UI Breakpoints
    const muiBp = toMuiBp(tuiBp)
    // Material UI Palette
    const muiColors = toMuiColors(tuiColors, tuiMode)
    // Material UI Typography
    const muiTyp = toMuiTyp({ tuiFonts, tuiFontSizes, tuiFontWeights, tuiLineHeights, tuiStyles })
    // Material UI Spacing
    const muiSpace = toMuiSpace(tuiSpace)

    // Theme object that should be passed to createMuiTheme
    const muiTheme = {
        ...(muiBp ? { breakpoints: { ...muiBp } } : {}),
        ...(muiColors ? { palette: { ...muiColors } } : {}),
        ...(muiTyp ? { typography: { ...muiTyp } } : {}),
        ...(muiSpace ? { spacing: [...muiSpace] } : {}),
        ...(zIndices ? { zIndex: { ...zIndices } } : {}),
    }

    return muiTheme
}

export default toMui