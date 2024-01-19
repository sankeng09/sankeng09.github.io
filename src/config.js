let config = {
  mode:'dev',
  endpoint: 'http:/locahost:5000/skyfall',
  firebase: {
    apiKey: "AIzaSyBXULmzpWOIuOjZ6xxRENCUN-AuAjWBahQ",
    authDomain: "spy4-dev.firebaseapp.com",
    databaseURL: "https://spy4-dev.firebaseio.com",
    projectId: "spy4-dev",
    storageBucket: "spy4-dev.appspot.com",
    messagingSenderId: "614067862845"
  }
}

const ifaces = require('os').networkInterfaces()
const dev_ip = '192.168.11.9'

if(Object.keys(ifaces).length>1){
  if(ifaces[Object.keys(ifaces)[1]][0].address !== dev_ip){
    config = {
      ...config,
      mode: 'build',
      endpoint: 'http://young-ravine-19261.herokuapp.com/skyfall'
    }
  }
}

export default config
