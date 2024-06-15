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
                      'Add a new department',
                      'Add a new role',
                      'Exit'],
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

// const askRole = [
//     {
//         name:    "roleTitleName",
//         message: "What is the title of the new role?",
//         type:    "input",           
//     },
//     {
//         name:    "roleSalary",
//         message: "What is the salary of the role?",
//         type:    "input",           
//     },
//     {
//         name:    "listDepartments",
//         message: "In Which department? ",
//         type:    "list",       
//         choices:  listofoptions,
//     }
// ];

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

module.exports ={inquirerMenu,inquirerDepartment, inquirerRole};
