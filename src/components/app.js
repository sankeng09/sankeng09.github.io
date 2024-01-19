import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from '../lib/store'
import { initGA, logPageView } from '../lib/ga'
import { Typography } from '@material-ui/core'

export default class App extends Component {
  state = {
    loading: true
  }
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
    window.onload = ()=>this.setState({loading: false})
  }
  render() {
    if(this.state.loading)return <div style={{paddingTop:'20em',textAlign:'center'}}><Typography>LOADING...</Typography></div>
    return <Provider store={store} children={this.props.children} />
  }
}
