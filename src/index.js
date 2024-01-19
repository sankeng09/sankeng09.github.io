import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import * as serviceWorker from './serviceWorker'
import Home from './components/home'
import { withStyles } from '@material-ui/core/styles'
import MyDocument from './_document'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})

class _Index extends React.Component {
  render() {
    return (
      <MyDocument>
        <App>
          <Home/>
        </App>
      </MyDocument>
    )
  }
}

const Index = withStyles(styles)(_Index)

ReactDOM.render(<Index/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
