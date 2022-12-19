const express = require('express');

const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',

    user: 'root',

    password: 'Jordan_1998!',
    database: 'employee_db'
},
console.log('Connected to the employee_db.')
);

app.post('/api/new-department', ({body}, res) =>{
    const sql = `INSERT INTO department (department_name)
    VALUSE(?)`;
    const params =[body.department_name];

    db.query(sql, params, (err, result)=>{
        if (err) {
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});


app.get('/api/department', (req, res) =>{
    const sql = `SELECT id, department_name AS title FROM department`;

    db.query(sql, (err, rows) => {
        if (err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.delete('/api/department/:id', (req, res) =>{
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) =>{
        if (err){
            res.statusMessage(400).json({error: res.message});
        } else if (!result.affectedRows){
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


app.get('/api/roles', (req, res) => {
    const sql = `SELECT department.department_name, roles.title FROM roles LEFT JOIN department ON roles.department_id = department.id ORDER BY department.department_name;`;
db.query(sql, (err, rows) => {
    if (err){
        res.status(500).json({error: err.message});
        return;
    }
    res.json({
        message: 'success',
        data: rows
        });
    });
});

app.put('/api/roles/:id', (req, res) =>{
    const sql = `UPDATE roles SET roles = ? WHERE id = ?`;
    const params = [req.body.title, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err){
            res.status(400).json({error: err.message});
        } else if (!result.affectedRows){
            res.json({
                message: 'Role not found'
            });
        }else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

app.get('/api/employee', (req, res) => {
    const sql = `SELECT roles.title AS role, employee.last_name FROM employee LEFT JOIN roles ON employee.role_id = roles.id ORDER BY roles.title;`;
db.query(sql, (err, rows) => {
    if (err) {
        res.status(500).json({error: err.message});
        return;
    }
    res.json({
        message: 'success',
        data: rows
        });
    });
});

app.put('/api/employee/:id', (req, res) => {
    const sql = `UPDATE employee SET employee = ? WHERE id =?`;
    const params = [req.body.employee, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error:err.message});
        } else if (!result.affectedRows){
            res.json({
                message: ' Employee not Found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

app.delete('/api/employee/:id', (req,res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({error: res.message});
        } else if (!result.affectedRows) {
            res.json ({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'deleted employee',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

app.use((req, res) =>{
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});