INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 85000, 4),
       ('Salesperson', 70000, 4),
       ('Finance Manager', 89000, 2),
       ('Accountant', 75000, 2),
       ('Software Engineer', 98000, 1),
       ('Lead Engineer', 120000, 1),
       ('Lawyer', 125000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sarah', 'Jones', 1, NULL),
       ('Mike', 'Wilson', 2, 1),
       ('John', 'Taylor', 3, NULL),
       ('Laura', 'Rodriguez', 4, 3),
       ('Scott', 'Thomas', 5, 6),
       ('Lawrence', 'Allen', 6, NULL),
       ('Mike', 'Chan', 7, NULL);
