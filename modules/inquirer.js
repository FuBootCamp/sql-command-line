const inquirer = require('inquirer');

const optionsList = [
    {
        name:    "listOption",
        message: "What would you like to do?",
        type:    "list",       
        choices: ['View all departments', 'View all employees', 'View all roles', 'Exit'],
    }
];

const inquirerMenu = async() => {
    const selectedOption = await inquirer.prompt(optionsList);
    return selectedOption.listOption;
};

module.exports ={inquirerMenu};
