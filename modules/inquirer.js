const inquirer = require('inquirer');

const optionsList = [
    {
        name:    "listOption",
        message: "What would you like to do?",
        type:    "list",       
        choices: ['View all departments', 
                  'View all roles',
                  'View all employees',
                  'Add a new department',
                  'Exit'],
    }
];

const inquirerMenu = async() => {
    const selectedOption = await inquirer.prompt(optionsList);
    return selectedOption.listOption;
};

const askDepartment = [
    {
        name:    "departmentName",
        message: "What is the name of the department?",
        type:    "input",           
    }
];

const inquirerDepartment = async() => {
    const newDepartmnetname = await inquirer.prompt(askDepartment);
    return newDepartmnetname;
};


module.exports ={inquirerMenu,inquirerDepartment};
