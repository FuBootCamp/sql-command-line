const { inquirerMenu } = require('./modules/inquirer');
const { viewAllRoles } = require('./modules/pg');


// console.clear();
const main = async() => {
      let selectedOption = '';
      do {
          selectedOption = await inquirerMenu();
          console.log(` The selected option is ${selectedOption}`);

          switch (selectedOption) {
            case 'View all roles':
                  // console.log('Get all rows of roles');
                  const queryResult = await viewAllRoles();
                  console.table(queryResult);
                  break;
            default:
          }
      } while (selectedOption !== 'Exit');
};

main();
