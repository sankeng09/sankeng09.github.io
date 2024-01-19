import { createStore } from 'redux'

const reducer = (state = { lang: 'en', room: { id: null } }, action) => {
  switch (action.type) {
    case 'CHANGE_LANG': return { ...state, lang: action.newLang };
    case 'JOIN_ROOM': return { ...state, room: { id: action.newRoomId } }
    case 'UPDATE_ROOM': return { ...state, room: { id: state.room.id, ...action.room } }
    default: return state;
  }
}

const setLang = newLang => ({ type: 'CHANGE_LANG', newLang })
const joinRoom = newRoomId => ({ type: 'JOIN_ROOM', newRoomId })
const updateRoom = room => ({ type: 'UPDATE_ROOM', room })

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

export {
  store,
  setLang,
  joinRoom,
  updateRoom
}
