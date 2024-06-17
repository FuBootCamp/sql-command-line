const { inquirerMenu, inquirerDepartment, inquirerRole, inquirerEmployee, inquirerUpdateRoleEmp } = require('./modules/inquirer');
const { viewRows, addRow } = require('./modules/pg');


// console.clear();
const main = async() => {
      let selectedOption = '';
      var queryResult = '';
      do {
          selectedOption = await inquirerMenu();
          console.log(` The selected option is ${selectedOption}`);

          switch (selectedOption) {
            case 'View all departments':
                  var thisQuery = `SELECT id as id_, name as department from department`
                  var queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'View all roles':
                  var thisQuery = `SELECT role.id as id_, role.title, role.salary, department.name as department
                                   FROM role
                                   JOIN department on role.department_id = department.id`
                  // console.log('Get all rows of roles');
                  var queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'View all employees':
                  var thisQuery = `SELECT e.id as id_, e.first_name, e.last_name, role.title, department.name as department, role.salary, m.first_name || ' ' || m.last_name as manager
                                   FROM employee e, employee m, role, department
                                   WHERE e.manager_id is not null and e.manager_id = m.id and department.id = role.department_id and role.id = e.role_id
                                   UNION
                                   SELECT e.id as ids, e.first_name, e.last_name, role.title, department.name as department, role.salary, null  as manager
                                   FROM employee e, role, department
                                   WHERE e.manager_id is null and department.id = role.department_id and role.id = e.role_id
                                   ORDER BY id_;`
                  // console.log('Get all rows of roles');
                  var queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'Add a department':
                  var newDepartmentName = await inquirerDepartment();
                  var thisQuery = `INSERT INTO department (name)
                                   VALUES ('${newDepartmentName.departmentName}')`;
                  var queryResult = await addRow(thisQuery);
                  console.log(`Department added: ${newDepartmentName.departmentName}`);
                  break;
            case 'Add a role':
                  var thisQuery = `SELECT id, name FROM department`
                  var queryResult = await viewRows(thisQuery);
                  var newRoleTitle = await inquirerRole(queryResult);
                  var thisQuery = `INSERT INTO role (title, salary, department_id)
                                   VALUES ('${newRoleTitle.roleTitleName}',
                                           '${newRoleTitle.roleSalary}',
                                           '${newRoleTitle.listDepartments}')`;
                  // console.log(thisQuery);
                  queryResult = await addRow(thisQuery);
                  console.log(`Role added: ${newRoleTitle.roleTitleName}`);
                  break;
            case 'Add an employee':
                  var thisQuery = `SELECT id, title FROM role`
                  var queryResultRol = await viewRows(thisQuery);
                  var thisQuery = `SELECT id, first_name, last_name FROM employee`
                  var queryResultEmp = await viewRows(thisQuery);
                  var newEmployee = await inquirerEmployee(queryResultRol,queryResultEmp);
                  var thisQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                   VALUES ('${newEmployee.employeesFirstName}',
                                           '${newEmployee.employeesLastName}',
                                           '${newEmployee.listRoles}',
                                           '${newEmployee.listManagers}')`;
                  // console.log(thisQuery);
                  if (newEmployee.listManagers === 0) {
                        var thisQuery = `INSERT INTO employee (first_name, last_name, role_id)
                                         VALUES ('${newEmployee.employeesFirstName}',
                                         '${newEmployee.employeesLastName}',
                                         '${newEmployee.listRoles}')`;
                        }
                  queryResult = await addRow(thisQuery);
                  console.log(`Employee added: ${newEmployee.employeesFirstName} ${newEmployee.employeesLastName} `);
                  break;             
            case 'Update an employee role':
                  var thisQuery = `SELECT id, first_name, last_name FROM employee`
                  var queryResultEmployees = await viewRows(thisQuery);
                  var thisQuery = `SELECT id, title FROM role`
                  var queryResultRoles = await viewRows(thisQuery);
                  var updateEmployee = await inquirerUpdateRoleEmp(queryResultEmployees,queryResultRoles);
                  var thisQuery = `UPDATE employee
                                   SET role_id = ${updateEmployee.listRoles}
                                   WHERE id =  ${updateEmployee.listEmployees}`
                  // console.log(thisQuery);
                  queryResult = await addRow(thisQuery);
                  console.log(`Role of the employee  updated: ${updateEmployee.employeesFirstName} ${updateEmployee.employeesLastName} `);
                  break;           
            default:
          }
      } while (selectedOption !== 'Exit');
};

main();

