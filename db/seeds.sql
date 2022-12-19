INSERT INTO department (department_name)
VALUES ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Human Resources");

INSERT INTO roles (department_id, title, salary)
VALUES (1,"Sales Lead", 250000),
    (1, "Salesperson", 125000),
    (1, "Canvasser", 75000),
    (2, "Lead Engineer", 350000),
    (2, "Software Engineer", 175000),
    (2, "Engineering Intern", 60500),
    (3, "Account Manager", 275000),
    (3, "Accountant", 137500),
    (1, "Customer Service Agent", 68750),
    (4, "Legal Team Lead", 350000),
    (4, "Attorney", 175000),
    (4, "Legal Advisor", 87500),
    (4, "Paralegal", 55000),
    (5, "Director of Human Resources", 150000),
    (5, "Associate Human Resources Officer", 75000);

    INSERT INTO employee (role_id, first_name, last_name)
    VALUES (1, "Shelley", "Boyers"),
        (2, "Ben", "Gooden"),
        (3, "Katie", "Nelson"),
        (4, "Mark", "Agee"),
        (5, "Martin", "Valdez"),
        (6, "Adam", "Smith"),
        (7, "Abigail","Bailowe"),
        (8, "Ashley", "Derstine"),
        (9, "Andrew", "Randolph"),
        (10, "Jim", "Campbell"),
        (11, "Tyler", "Anderson"),
        (12, "Rene", "Sharp"),
        (13, "James", "Ashemore"),
        (14, "Suzanne", "Lochner"),
        (15, "Darryl", "Evans");
