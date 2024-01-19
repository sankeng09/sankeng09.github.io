import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Menu, MenuItem } from '@material-ui/core/index'
import { withStyles } from '@material-ui/core/styles'
import { setLang } from '../lib/store'
import { langList } from '../lib/i18n'
import Language from './svg/language'
import { getCookie, setCookie } from '../lib/cookie'

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
})

class Picker extends Component {
  state = {
    anchorEl: null,
  }

  componentDidMount() {
    const lang = getCookie('lang')
    if (lang && lang !== 'en') {
      this.props.setLang(lang)
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = (value = null) => {
    this.setState({ anchorEl: null })
    if (!!value) {
      setCookie('lang', value, 99)
      this.props.setLang(value)
    }
  };


  render() {
    const { anchorEl } = this.state
    return (
      <div>
        <Button variant='outlined' onClick={this.handleClick}>
          Language <Language />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose(null)}
        >
          {
            Object.keys(langList).map(lang => (
              <MenuItem onClick={() => this.handleClose(lang)} key={lang}>
                {langList[lang].name}
              </MenuItem>))
          }
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = ({ lang }) => ({ lang })
const mapDispatchToProps = (dispatch) => ({ setLang: (...args) => dispatch(setLang(...args)) })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Picker))
