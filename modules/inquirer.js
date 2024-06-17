const inquirer = require('inquirer');
// let listofoptions = ["hola", "adios", "hasta luego"];

const inquirerMenu = async() => {
    const selectedOption = await inquirer.prompt(
          [
            {
            name:    "listOption",
            message: "What would you like to do?",
            type:    "list",       
            choices: ['View all departments', 
                      'View all roles',
                      'View all employees',
                      'Add a department',
                      'Add a role',
                      'Add an employee',
                      'Update an employee role',
                      'Exit'],
            loop: false,
            }
          ]);
    return selectedOption.listOption;
};

const inquirerDepartment = async() => {
    const newDepartmentname = await inquirer.prompt(
        [ 
          {
            name:    "departmentName",
            message: "What is the name of the department?",
            type:    "input",           
          }
        ]);

    return newDepartmentname;
};

const inquirerRole = async(listofdepartments) => {
    const newRoleTitle = await inquirer.prompt(
        [
            {
              name:    "roleTitleName",
              message: "What is the title of the new role?",
              type:    "input",           
            },
            {
              name:    "roleSalary",
              message: "What is the salary of the role?",
              type:    "input",           
            },
            {
              name:    "listDepartments",
              message: "In Which department? ",
              type:    "list",       
              choices:  listofdepartments.map((listValues) => { 
                        return {
                            name:  listValues.name,
                            value: listValues.id,
                               };
                        }),
            }
        ]);

    return newRoleTitle;
};

const inquirerEmployee = async(listofRoles, listofManagers) => {
  let nullRow = {
    "id" : 0,
    "first_name" : "Null",
    "last_name" : ""
    }
  listofManagers.unshift(nullRow);
  // console.log(listofManagers);
  const newRoleTitle = await inquirer.prompt(
      [
          {
            name:    "employeesFirstName",
            message: "What is the employee's first name?",
            type:    "input",           
          },
          {
            name:    "employeesLastName",
            message: "What is the employee's last name?",
            type:    "input",           
          },
          {
            name:    "listRoles",
            message: "What is the employee's role? ",
            type:    "list",       
            choices:  listofRoles.map((listValues) => { 
                      return {
                          name:  listValues.title,
                          value: listValues.id,
                             };
                      }),
          },
          {
            name:    "listManagers",
            message: "Who is the employee's manager? ",
            type:    "list",       
            choices:  listofManagers.map((listValues) => { 
                      return {
                          name:  `${listValues.first_name} ${listValues.last_name}`,
                          value: listValues.id,
                             };
                      }),
            loop:     false, 
          }
      ]);

  return newRoleTitle;
};


const inquirerUpdateRoleEmp = async(listofEmployees, listofRoles) => {

  // console.log(listofManagers);
  const updateRole = await inquirer.prompt(
      [
        {
          name:    "listEmployees",
          message: "Which employee's role do you want to update? ",
          type:    "list",       
          choices:  listofEmployees.map((listValues) => { 
                    return {
                        name:  `${listValues.first_name} ${listValues.last_name}`,
                        value: listValues.id,
                           };
                    }),
          },
          {
            name:    "listRoles",
            message: "Which role do you want to assign the selected employee? ",
            type:    "list",       
            choices:  listofRoles.map((listValues) => { 
                      return {
                          name:  listValues.title,
                          value: listValues.id,
                             };
                      }),
          }
      ]);

  return updateRole;
};

module.exports ={inquirerMenu,inquirerDepartment, inquirerRole, inquirerEmployee, inquirerUpdateRoleEmp};
