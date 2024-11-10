INSERT INTO department (id, name)
VALUES (1, 'Engineering'),
       (2, 'Finance'),
       (3, 'Legal'),
       (4, 'Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Lead', 85000, 4),
       (2, 'Salesperson', 70000, 4),
       (3, 'Finance Manager', 89000, 2),
       (4, 'Accountant', 75000, 2),
       (5, 'Software Engineer', 98000, 1),
       (6, 'Lead Engineer', 120000, 1),
       (7, 'Lawyer', 125000, 3);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Sarah', 'Jones', 1),
       (2, 'Mike', 'Wilson', 2, 1),
       (3, 'John', 'Taylor', 3),
       (4, 'Laura', 'Rodriguez', 4, 3),
       (5, 'Scott', 'Thomas', 5, 6),
       (6, 'Lawrence', 'Allen', 6),
       (7, 'Mike', 'Chan', 7);
