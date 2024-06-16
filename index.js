const { inquirerMenu, inquirerDepartment, inquirerRole, inquirerEmployee } = require('./modules/inquirer');
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
                  var thisQuery = `SELECT department.name from department`
                  var queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'View all roles':
                  var thisQuery = `SELECT role.title, role.salary, department.name
                                   FROM role
                                   JOIN department on role.department_id = department.id`
                  // console.log('Get all rows of roles');
                  var queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'View all employees':
                  var thisQuery = `SELECT employee.first_name, employee.last_name, role.title, role.salary
                                   FROM employee, role, department
                                   WHERE employee.role_id = role.id AND employee`
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
                  console.log(thisQuery);
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
            default:
          }
      } while (selectedOption !== 'Exit');
};

main();
