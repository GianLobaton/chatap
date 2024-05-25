const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 8000;
const socketio = require('socket.io');


// const server = http.createServer((req, res) => {
//   const filePath = path.resolve(__dirname, './message.html');
//   const fileContent = fs.readFileSync(filePath);

//   res.writeHead(200, {'content-type': 'text/html'});
//   res.end(fileContent);
// });

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chattyapp",
  port: 3307,
});

const server = http.createServer((req, res) => {
//   if (req.url === '/' || req.url === '/signup') {
      
//     if (req.method === 'GET') {
       
//         const filePath = path.resolve(__dirname, './signup.html');
//         const fileContent = fs.readFileSync(filePath);
//         res.writeHead(200, { 'content-type': 'text/html' });
//         res.end(fileContent);
//     } else if (req.method === 'POST') {
        
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString(); 
//         });
//         req.on('end', () => {
           
//             const formData = new URLSearchParams(body);
//             const FullName =formData.get('FullName');
//             const user_email= formData.get('email');
//             const user_password = formData.get('psw');
            
//             con.query('INSERT INTO user (FullName, user_email, user_password) VALUES (?,?,?))', (err, results) => {
//                 if (err) {
//                     console.error('Error querying database:', err);
                    
//                     return;
//                 }
//                 if (results.length > 0) {
                    
//                     res.writeHead(302, { 'Location': '/login.html' });
//                     res.end();
//                 } else {
                    
//                     res.writeHead(302, { 'Location': '/signup' });
//                     res.end();
//                 }
//             });
//         });
//     }
if (req.url === '/' || req.url === '/login') {
      
      if (req.method === 'GET') {
         
          const filePath = path.resolve(__dirname, './account.html');
          const fileContent = fs.readFileSync(filePath);
          res.writeHead(200, { 'content-type': 'text/html' });
          res.end(fileContent);
      } else if (req.method === 'POST') {
          
          let body = '';
          req.on('data', chunk => {
              body += chunk.toString(); 
          });
          req.on('end', () => {
             
              const formData = new URLSearchParams(body);
              const user_email= formData.get('email');
              const user_password = formData.get('psw');
              
              con.query('SELECT * FROM user WHERE user_email = ? AND user_password = ?', [user_email, user_password], (err, results) => {
                  if (err) {
                      console.error('Error querying database:', err);
                      
                      return;
                  }
                  if (results.length > 0) {
                      
                      res.writeHead(302, { 'Location': '/message.html' });
                      res.end();
                  } else {
                      
                      res.writeHead(302, { 'Location': '/login' });
                      res.end();
                  }
              });
          });
      }
  } else if (req.url === '/message.html') {
      
      const filePath = path.resolve(__dirname, './message.html');
      const fileContent = fs.readFileSync(filePath);
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(fileContent);
  } else {
     
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('Page not found');
  }
});

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('user connected');

  // messageCollection.find().toArray().then(function(docs){
  //   socket.emit("chatHistory");

  // });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (message) => {
    console.log('user says: ', message);
    console.log(message);
    const mess = JSON.parse(message);
   

    con.query(
      `INSERT INTO groups(name,chat) VALUES (?, ?)`,
      [mess.user, mess.message],
      (err, rows) => {
        if (err) throw err;
        return
      }
    )

    con.query(
      `SELECT * FROM groups`,
      [mess.user, mess.message],
      (err, rows) => {
        if (err) throw err;
        return
      }
    )
    io.emit('message', message);
  });
});


  // io.on('message', (message) => {
  //   const html = '';
  //   message.forEach((row) => {
  //     html += `<p>${row.name} - ${row.message}</p>`;
  //   });
  //   document.getElementById('body').innerHTML = html;
  // });

// io.on('updateData', (data)=>{
//   console.log(`Received data to update: ${data}`);
// });
    

// })

// io.on('getData',()=>{
  
// })


server.listen(port, () => {
  console.log(`Listening on https://localhost:${port}`);
});


