
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    port: 3307 // optional when don't use 3306
}); 
connection.connect(function (err){
    if(err) throw err;
    console.log('mysql connected successfully');

    let sql = ' CREATE DATABASE kigarama_trainng';
    connection.query(sql, function(err, res){
        if(err) throw err;
        console.log('Database created');
    })
    
});