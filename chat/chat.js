var firebaseConfig = {
  apiKey: "AIzaSyB2ix7ULHU0oX0MhLFZeZsMdJfbd6Lg2aQ",
  authDomain: "chat-sk-181aa.firebaseapp.com",
  databaseURL: "https://chat-sk-181aa-default-rtdb.firebaseio.com",
  projectId: "chat-sk-181aa",
  storageBucket: "chat-sk-181aa.appspot.com",
  messagingSenderId: "22173074452",
  appId: "1:22173074452:web:f7b0c51fa9db77fe6d9301",
  measurementId: "G-NQ16DVKVY6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var name = localStorage.getItem("name");

  function send(){
      var msg = document.getElementById('msg_text').value;
      if(msg != ""){
        firebase.database().ref("messages").push({
            msg : msg,
            sender : name

        }).then(function(){
            document.getElementById('msg_text').value = "";
        })
      }
  }

  firebase.database().ref("messages").on("child_added" , function(snapshot){
      var username = snapshot.val().sender;
      var msg = snapshot.val().msg;
      var html = "";
      if(username == name){
          html += "<div class='message_me' align='right'><p class='user'>" +username + "</p><p class='msg_me'>"+ msg +"</p></div>";
          document.getElementById("box_messages").innerHTML += html;

      }else{
        html += "<div class='message_user' align='left'><p class='user'>" +username + "</p><p class='msg_user'>"+ msg +"</p></div>";
        document.getElementById("box_messages").innerHTML += html;
      }

      var div_obj = document.getElementById("box_messages");
      div_obj.scrollTop = div_obj.scrollHeight;
  });