const expres = require('express');
const mysql = require('mysql2');

const app = expres();

// middleware to parse json

app.use(expres.json());

// create connection to mysql
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database: 'kigarama_trainng',
    port: 3307

});

// connect to db
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
}); 

// endpoint to gett all students
app.get('/api/students', (req, res)=>{
    let sql = 'SELECT * FROM students';
    connection.query(sql, (err, results)=>{
        if(err) throw err;
        res.status(200).json(results);

    })
});

// endpoint to create a new student

app.post('/api/students', async (req, res)=>{
    const {fname, lname, address, age} = req.body;
    let sql = `INSERT INTO students (fname, lname, address, age)
               VALUES (?,?,?,?) `;

              await connection.query(sql,[fname, lname,address,age],(err, results)=>{
                if(err) throw err;
                res.status(201).json({message: 'Student added successfully'});
               })

});

// get students by id
app.get('/api/students/:id', (req, res)=>{
    let {id} = req.params;
    let sql = `SELECT * FROM students WHERE id =?`;
    connection.query(sql,[id],(err, results)=>{
        if(err) throw err;
        if(results.length === 0){
            res.status(404).json({message: 'Student not found'});
        }
        res.status(200).json(results);

})  
}); 
// update student by id

app.put('/api/students/:id',(req, res)=>{
 const {id} = req.params;
 let {fname, lname, address, age} = req.body;
 let sql = `UPDATE students SET fname =?, lname =?, address =?, age =? WHERE id =?`;
 connection.query(sql, [fname, lname, address, age,id],(err, results)=>{
    if(err) throw err;
    if(results.affectedRows === 0){
        res.status(404).json({message: 'Student not found'});
    }
    res.status(200).json({message: 'Student updated successfully'});
 })
})

//delete student  by id

app.delete('/api/students/:id', (req, res)=>{
    let {id} = req.params;
    let sql = `DELETE FROM students WHERE id =?`;
    connection.query(sql,[id],(err, results)=>{
        if(err) throw err;
        if(results.affectedRows === 0){ 
            res.status(404).json({message: 'Student not found'});
        }
        res.status(200).json({message: 'Student deleted successfully'});
    })
})






app.listen(8090, ()=>{
    console.log('Server running on  http://localhost:8090');
});