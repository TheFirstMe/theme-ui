# @theme-ui/material-ui

Generate Material UI theme from Theme UI theme for usage with Material UI components.

## Installation

```
yarn add @theme-ui/material-ui
```

Note: `@material-ui/core` has to be installed for using this package.

```
yarn add @material-ui/core
```

## Usage

```js
import { ThemeProvider } from 'theme-ui'
import { MaterialUIProvider } from '@theme-ui/material-ui'
import theme from './theme'

export default props => (
  <ThemeProvider theme={theme}>
    <MaterialUIProvider>
      {props.children}
    </MaterialUIProvider>
  </ThemeProvider>
)
```