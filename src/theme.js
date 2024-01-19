import { createMuiTheme } from '@material-ui/core'
import purple from '@material-ui/core/colors/purple'
import pink from '@material-ui/core/colors/pink'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: pink[300],
      main: pink[500],
      dark: pink[700],
    },
  },
})

export default theme
