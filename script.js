
var socket = io();
var mysql = require('mysql');
var messagesList = $(".messages-list");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "chattyapp",
  port: 3307
});

con.connect(function(err) {
  if (err) throw err;
  console.log("connected! ");
});


var send = document.getElementById("send");
var input = document.getElementById("input");
var messages = document.getElementById("messages");


send.addEventListener("click", function(e) {
  e.preventDefault();
  
  if (input.value) {
    socket.emit('message', JSON.stringify({ user: document.getElementById('username').value, message: input.value}));
    input.value = "";
  }
});

socket.on("message", function(payload) {
  var newMessage = document.createElement("li");
  const { user, message } = JSON.parse(payload)
  newMessage.textContent = `${user}: ${message}`;
  
  
  messages.appendChild(newMessage);
});

// var webSocket = new WebSocket("http://localhost:8000/");
// webSocket.onmessage = function (event) {
//   console.log(event.data);
// }



// socket.on("chatHistory",function (data){
//     messagesList.find("li").remove();
//     $.each(data, function(){
//       messagesList.append("<li>"+this.text+"</li>");
//     });
// });