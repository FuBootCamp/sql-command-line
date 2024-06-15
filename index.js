const { inquirerMenu, inquirerDepartment, inquirerRole } = require('./modules/inquirer');
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
                  queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'View all roles':
                  var thisQuery = `SELECT role.title, role.salary, department.name
                                   FROM role
                                   JOIN department on role.department_id = department.id`
                  // console.log('Get all rows of roles');
                  queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'View all employees':
                  var thisQuery = `SELECT employee.first_name, employee.last_name, role.title
                                   FROM employee
                                   JOIN role on employee.role_id = role.id`
                  // console.log('Get all rows of roles');
                  queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'Add a new department':
                  var newDepartmentName = await inquirerDepartment();
                  var thisQuery = `INSERT INTO department (name)
                                   VALUES ('${newDepartmentName.departmentName}')`;
                  queryResult = await addRow(thisQuery);
                  console.log(`Department added: ${newDepartmentName.departmentName}`);
                  break;
            case 'Add a new role':
                  var thisQuery = `SELECT id, name from department`
                  queryResult = await viewRows(thisQuery);
                  var newRoleTitle = await inquirerRole(queryResult);
                  var thisQuery = `INSERT INTO role (title, salary, department_id)
                                   VALUES ('${newRoleTitle.roleTitleName}',
                                           '${newRoleTitle.roleSalary}',
                                           '${newRoleTitle.listDepartments}')`;
                  console.log(thisQuery);
                  queryResult = await addRow(thisQuery);
                  console.log(`Role added: ${newRoleTitle.roleTitleName}`);
                  break;       
            default:
          }
      } while (selectedOption !== 'Exit');
};

main();
