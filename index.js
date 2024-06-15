const { inquirerMenu } = require('./modules/inquirer');
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
                  var thisQuery = `select department.name from department`
                  queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'View all roles':
                  var thisQuery = `select role.title, role.salary, department.name
                                   from role
                                   join department on role.department_id = department.id`
                  // console.log('Get all rows of roles');
                  queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'View all employees':
                  var thisQuery = `select employee.first_name, employee.last_name, role.title
                                   from employee
                                   join role on employee.role_id = role.id`
                  // console.log('Get all rows of roles');
                  queryResult = await viewRows(thisQuery);
                  console.table(queryResult);
                  break;
            case 'Add a new department':
                  console.log(' Add a new department');
                  queryResult = await addRow();
                  console.log(queryResult.departmentName);
                  break;      
            default:
          }
      } while (selectedOption !== 'Exit');
};

main();
