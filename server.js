const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 4000;
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '10.9.3.218',
    user: 'TWStudent',
    password: 'TechWorks!',
    database : 'employeedb',
    multipleStatements: true
});

mysqlConnection.connect(err => {
    if(!err) console.log(`DB connection succeded`)
    else {
        console.log(
            `DB connection failed Error: ` + JSON.stringify(err, undefined, 2))
    }
});

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// app.get('/api/rowdycrew', (req, res) =>{
//     const rowdycrew = [
//         {id: 1, firstName: 'Notorious', lastName: 'One'},
//         {id: 2, firstName: 'Loud', lastName: 'Packs'},
//         {id: 3, firstName: 'Dirk', lastName: 'Diggler'}
//     ];
//     res.json(rowdycrew);
// });

app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, field) => {
        if(!err) res.send(rows);
        else console.log(err);
       
    });
    
});

// Get an employee
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query(
        'SELECT * FROM Employee WHERE EmpID =?',
        [req.params.id],
        (err, rows, field) => {
            if(!err) res.send(rows);
            else console.log(err);
        }
    );
});

// Delete yo Employeeees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query(
        'DELETE FROM Employee WHERE EmpID =?',
        [req.params.id],
        (err, rows, field) => {
            if(!err) res.send('Deleted successfully');
            else console.log(err);
        }
    );
});

//Add yo Employeeee
app.post('/employees'), (req, res) => {
    let emp = req.body;
    let sql = 'SET @EmpId = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmplyeeAddorEdit(@EmpID,@name,@EmpCode,@Salary);';
    mysqlConnection.query(
        sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
        (err, rows, field) => {
            if (!err) res.send(rows)
            else console.log(err)
        }
    )
}






//Server
app.listen(port, ()=>{
    console.log(`Server Started on Port ${port}`);
});
