import inquirer from 'inquirer';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const main = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
      ],
    },
  ]);

  switch (action) {
    case 'View all departments':
      viewAllDepartments();
      break;
    case 'View all roles':
      viewAllRoles();
      break;
    case 'View all employees':
      viewAllEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
  }
};

const viewAllDepartments = () => {
  pool.query('SELECT id, name FROM departments', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result.rows);
    }
  });
};

const viewAllRoles = () => {
  pool.query('SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result.rows);
    }
  });
};

const viewAllEmployees = () => {
  pool.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, managers.first_name AS manager_first_name, managers.last_name AS manager_last_name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result.rows);
    }
  });
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ]);

  pool.query('INSERT INTO departments (name) VALUES ($1)', [name], (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Department added successfully!');
    }
  });
};

const addRole = async () => {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the name of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for the role:',
    },
  ]);

  pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id], (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Role added successfully!');
    }
  });
};

const addEmployee = async () => {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role ID for the employee:',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee (leave blank if none):',
    },
  ]);

  pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id || null], (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Employee added successfully!');
    }
  });
};

const updateEmployeeRole = async () => {
  const { employee_id, new_role_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the ID of the employee to update:',
    },
    {
      type: 'input',
      name: 'new_role_id',
      message: 'Enter the new role ID for the employee:',
    },
  ]);

  pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [new_role_id, employee_id], (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Employee role updated successfully!');
    }
  });
};

main();