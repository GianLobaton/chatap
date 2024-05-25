// const sqlite3 = require('sqlite3').verbose()

// let db = new sqlite3.Database('./chatapp.db',(err) =>{
//   if(err){
//     console.log(console.error.message)
//   }
//   console.log('connected')
//   db.close((err)=>
//   {
//     if(err){
//       console.log(err.message)
//     }

//   })
//   console.log('connection closed')
// })


var mysql = require('mysql');

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
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});

// var sql = "INSERT INTO groups(id, name, chat) VALUES ('?','?', '?')";
//   con.query(sql, function (err, result){
//     if (err) throw err;
//     console.log("Result: " + result);
//   });

//   con.query(`SELECT * FROM your_table_name`, (err, results) => {
//     if (err) {
//       console.error('Error retrieving data:', err);
//       return;
//     }
//     console.log('Data retrieved successfully!');
//     socket.emit('data', results);
//   });
// var sql = `UPDATE groups SET name = ?, chat =? WHERE id = ?`, [data.name, data.chat, data.id],(err,results) =>{
//   if(err){
//     console.error('Error updating data:',err)
//     return;
//   }
//   console.log(`Updated ${results.changedRows} rows`);
// }



// const{
//     createPool
// } = require('mysql');

// const mysql = require('mysql') 
// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: " ",
//     database:"chattyapp"
// })

// pool.query('select * from chatrooms', (err, result, fields)=>{
//     if (err){
//         return console.log(err);
//     }
//     return console.log(result)
// })
