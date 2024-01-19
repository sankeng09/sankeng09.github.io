import React, { Component } from 'react'
import { Button, Grid, Slide, TextField, Typography } from '@material-ui/core/index'
import { withStyles } from '@material-ui/core/styles'
import LangPicker from './lang-picker'
import { withi18n } from '../lib/i18n'
import { dbonce, dbset } from '../lib/init-firebase'
import Room from './room'
import Loading from './svg/loading'
import LastUpdate from './last-update'
import after24hours from '../lib/after24hours'
import ChatRoom from './chatroom'
import randInt from '../lib/rand-int'

const getInitialRoom = name => ({
  location: -1,
  players: { [name]: -1 },
  playing: false,
  expire: after24hours()
})

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '30vh',
    textAlign: 'center'

  },
  placeHolder: {
    marginTop: theme.spacing.unit * 16,
  },
  relative: {
    position: 'relative'
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      roomName: '',
      loading: false,
      joinedRoom: false,
      id: randInt(1, 1001)
    }
  }

  changeName = newName => {
    this.setState({ name: newName })
  }

  nameChangeHandler = ({ target: { value } }) => {
    this.setState({ name: value })
  }

  roomNameChangeHandler = ({ target: { value } }) => {
    this.setState({ roomName: value })
  }

  newRoom = async () => {
    this.setState({ loading: true })
    const { roomName, name } = this.state
    const { i18n: { ui } } = this.props
    let s = await dbonce(`/rooms/${roomName}`)
    if (!!s) {
      alert(`${ui.room} ${roomName} ${ui.already_exist}`)
      this.setState({ loading: false })
    } else {
      console.log('creating room')
      await dbset(`/rooms/${roomName}`, getInitialRoom(name))
      this.setState({ loading: false, joinedRoom: true })
    }
  }

  joinRoom = async () => {
    this.setState({ loading: true })
    const { roomName, name } = this.state
    const { i18n: { ui } } = this.props
    let s = await dbonce(`/rooms/${roomName}`)
    if (!s) {
      alert(`${ui.room} ${roomName} ${ui.not_exist}`)
      this.setState({ loading: false })
    } else if (s.playing) {
      alert(`${ui.game_already_started}`)
      this.setState({ loading: false })
    } else if (!!s.players && !!s.players[name]) {
      alert(`${ui.player} ${name} ${ui.already_exist}`)
      this.setState({ loading: false })
    } else {
      await dbset(`/rooms/${roomName}/players/${name}`, -1)
      await dbset(`/rooms/${roomName}/expire`, after24hours())
      this.setState({ loading: false, joinedRoom: true })
    }
  }

  leaveRoom = () => {
    console.log('leave room')
    this.setState({ joinedRoom: false })
  }

  render() {
    const { i18n: { ui }, classes } = this.props
    const { name, roomName, loading, joinedRoom, id } = this.state
    return (
      <div className={classes.root}>
        {(loading ? <Grid item children={<Loading/>}/> : null)}
        <ChatRoom channel={(joinedRoom ? roomName : '__global__')} name={(joinedRoom ? name : `Guest ${id}`)}/>
        <Grid item className={classes.relative}>
          <Slide direction="right" in={!joinedRoom} mountOnEnter unmountOnExit className={classes.absolute}>
            <div>
              <Typography variant="h2">{ui.welcome_to_spyfall}</Typography>
              <Grid container justify="center">
                <Grid item style={{ margin: '8px' }}>
                  <TextField
                    id="name"
                    label={ui.enter_your_name}
                    margin="normal"
                    onChange={this.nameChangeHandler}
                    value={name}
                    item
                  />
                </Grid>
                <Grid item style={{ margin: '8px' }}>
                  <TextField
                    id="room_name"
                    label={ui.enter_room_name}
                    margin="normal"
                    onChange={this.roomNameChangeHandler}
                    value={roomName}
                    item
                  />
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item style={{ margin: '8px' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.newRoom}
                    disabled={!name || !roomName || loading}>
                    {ui.new_room}
                  </Button>
                </Grid>
                <Grid item style={{ margin: '8px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.joinRoom}
                    disabled={!name || !roomName || loading}>
                    {ui.join_room}
                  </Button>
                </Grid>
              </Grid>
              <Grid style={{ marginTop: '32px' }} item>
                <LangPicker/>
              </Grid>
              <Grid style={{ marginTop: '32px' }} item>
                <LastUpdate repo='dipsywong98/SpyFall'/>
              </Grid>
            </div>
          </Slide>
          <Slide direction="left" in={joinedRoom} mountOnEnter unmountOnExit className={classes.absolute}>
            <div>
              <Room name={name} roomName={roomName} leaveRoom={this.leaveRoom} changeName={this.changeName}/>
              <Grid style={{ marginTop: '32px' }} item>
                <LangPicker/>
              </Grid>
              <Grid style={{ marginTop: '32px' }} item>
                <LastUpdate repo='dipsywong98/SpyFall'/>
              </Grid>
            </div>
          </Slide>
        </Grid>
      </div>
    )
  }
}

export default withi18n(withStyles(styles)(Home))
