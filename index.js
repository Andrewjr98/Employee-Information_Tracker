
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',

    user: 'root',

    password: 'Jordan_1998!',
    database: 'employeeDB'
},
console.log('Connected to the employeeDB.')
);

function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            message: ' What would you like to do?',
            name: "Choices",
            choices: [
                "View all Employees",
                "View all Departments",
                "View all Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Destroy Employee",
                "Change Employee Position",
                "All Finished"
            ],
        }
    ]).then(function (response) {
        switch (response.choices) {
            case "View all Employees":
                viewAll();
                break;

            case "View all Departments":
                viewAllDepartments();
                break;

            case "View all Roles":
                viewAllROles();
                break;

            case "Add Employee":
                addEmployee();
                break;
            
            case "Add Department": 
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Destroy Employee":
                destroyEmployee();
                break;

            case "Change Employee Position":
                promoteEmployee();
                break;

            case "All Finished":

        }
    })
}
promptUser();


function viewAll(){
    let query =`SELECT roles.title AS role, employee.last_name FROM employee LEFT JOIN roles ON employee.role_id = roles.id ORDER BY roles.title;`;
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

function viewAllROles (){
    let query = `SELECT department.department_name, roles.title FROM roles LEFT JOIN department ON roles.department_id = department.id ORDER BY department.department_name;`;
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

function viewAllDepartments (){
    let query =  `SELECT id, department_name AS title FROM department`;
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        promptUser();
    });
};

function addDepartment(){
    let query = `SELECT * FROM department;`;
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
            {
                type: 'input',
                message: 'A new department, that is exciting. Name this new department.',
                name: gotMyNewDepartmentOn
            }
        ]). then(function(response){
            console.log('I got my new department on tonight');
            connection.query(`INSERT INTO department (department_name) VALUES(?)`,
            {
                department: response.gotMyNewDepartmentOn
            },
            function(err, res){
                if (err) throw err;
                console.log(res.affectedRows + 'New department in 5...4...3...2...1');
                promptUser();
            });
        })
    });
};

function destroyEmployee (){
    let employeeArray= [];
    let query = `SELECT employee.first_name, employee.last_name, department.departmnet_name.
    FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON
    (role.department_id = department.id),
    ORDER BY employee.last_name`;
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        for (i = 0; i < res.length; i++){
            employeeArray.push(res[i].id);
        }
        inquirer.prompt([{
            type: "list",
            message: "Which employee shall I destroy?",
            choices: employeeArray,
            name: "last_name"
        }
    ]).then(function(response){
        var query = `DELETE FROM department WHERE id = ?`;
        connection.query(query,response, function(err, res){
            if (err) throw err;
            console.log(res.affectedRows + `Employee Disintegrated from Database\n`);
            promptUser();
        })
    })
    })
};

function promoteEmployee(){
    let rolesArray = [];
    let roleQuery = `SELECT roles.title FROM roles;`;
    connection.query(roleQuery, function (err,res){
        if (err) throw err;
        for (i=0; i< res.length; i++){
            rolesArray.push(res[i].title)
        }
    });
    let updateRole = [];
    let query= `SELECT employee.first_name, employee.last_name, department.departmnet_name.
    FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON
    (role.department_id = department.id),
    ORDER BY employee.last_name`;
    connection.query(query,function(err,res){
        if (err) throw err;
        console.table(res);
        for(i=0;i<res.length; i++){
            promoteEmployee.push(res[i].last_name);
        }
        inquirer.prompt([
            {
                type: 'list',
                message: 'Who Deserves a promotion?',
                choices: promoteEmployee,
                name: 'last_name' 
            },
            {
                type: 'list',
                message: 'What are you promoting them to?',
                choices: rolesArray,
                name: 'role'
            }
        ]).then(function(response){
            console.log("Promoting from within...\n");
            let promotion = response.role;
            let promotionId = rolesArray.indexOf(promotion);
            promotionId ++;
            var query = `UPDATE roles SET roles = ? WHERE id = ?`;
            connection.query(query, [
                {
                    role_id: promotionId
                },
                {
                    last_name: response.last_name
                }
            ],function(err,res){
                if (err) throw err;
                console.log("Successfully Promoted from within\n")
                promptUser();
            })
        })
    })
}
// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({extended: false}));
// app.use(express.json());



// app.post('/api/new-department', ({body}, res) =>{
//     const sql = `INSERT INTO department (department_name)
//     VALUES(?)`;
//     const params =[body.department_name];

//     db.query(sql, params, (err, result)=>{
//         if (err) {
//             res.status(400).json({error:err.message});
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body
//         });
//     });
// });


// app.get('/api/department', (req, res) =>{
//     const sql = `SELECT id, department_name AS title FROM department`;

//     db.query(sql, (err, rows) => {
//         if (err){
//             res.status(500).json({error: err.message});
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// app.delete('/api/department/:id', (req, res) =>{
//     const sql = `DELETE FROM department WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, result) =>{
//         if (err){
//             res.statusMessage(400).json({error: res.message});
//         } else if (!result.affectedRows){
//             res.json({
//                 message: 'Department not found'
//             });
//         } else {
//             res.json({
//                 message: 'deleted',
//                 changes: result.affectedRows,
//                 id: req.params.id
//             });
//         }
//     });
// });


// app.get('/api/roles', (req, res) => {
//     const sql = `SELECT department.department_name, roles.title FROM roles LEFT JOIN department ON roles.department_id = department.id ORDER BY department.department_name;`;
// db.query(sql, (err, rows) => {
//     if (err){
//         res.status(500).json({error: err.message});
//         return;
//     }
//     res.json({
//         message: 'success',
//         data: rows
//         });
//     });
// });

// app.put('/api/roles/:id', (req, res) =>{
//     const sql = `UPDATE roles SET roles = ? WHERE id = ?`;
//     const params = [req.body.title, req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err){
//             res.status(400).json({error: err.message});
//         } else if (!result.affectedRows){
//             res.json({
//                 message: 'Role not found'
//             });
//         }else {
//             res.json({
//                 message: 'success',
//                 data: req.body,
//                 changes: result.affectedRows
//             });
//         }
//     });
// });

// app.get('/api/employee', (req, res) => {
//     const sql = `SELECT roles.title AS role, employee.last_name FROM employee LEFT JOIN roles ON employee.role_id = roles.id ORDER BY roles.title;`;
// db.query(sql, (err, rows) => {
//     if (err) {
//         res.status(500).json({error: err.message});
//         return;
//     }
//     res.json({
//         message: 'success',
//         data: rows
//         });
//     });
// });

// app.put('/api/employee/:id', (req, res) => {
//     const sql = `UPDATE employee SET employee = ? WHERE id =?`;
//     const params = [req.body.employee, req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error:err.message});
//         } else if (!result.affectedRows){
//             res.json({
//                 message: ' Employee not Found'
//             });
//         } else {
//             res.json({
//                 message: 'success',
//                 data: req.body,
//                 changes: result.affectedRows
//             });
//         }
//     });
// });

// app.delete('/api/employee/:id', (req,res) => {
//     const sql = `DELETE FROM employee WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.statusMessage(400).json({error: res.message});
//         } else if (!result.affectedRows) {
//             res.json ({
//                 message: 'Employee not found'
//             });
//         } else {
//             res.json({
//                 message: 'deleted employee',
//                 changes: result.affectedRows,
//                 id: req.params.id
//             });
//         }
//     });
// });
