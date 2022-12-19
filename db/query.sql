SELECT department.department_name AS department, 
roles.title FROM roles
LEFT JOIN department 
ON roles.department_id = department.id
ORDER BY department.department_name;

SELECT roles.title AS roles, 
employee.last_name FROM employee
LEFT JOIN roles
ON employee.role_id = roles.id
ORDER BY roles.title;
