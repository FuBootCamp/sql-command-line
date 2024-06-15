const { inquirerDepartment } = require('./inquirer');
const { Client } = require('pg');

const viewRows = async (thisQuery) => {
    // console.log(thisQuery);
    const client = new Client(
            {
                user: 'postgres',
                password: 'B00tP0st12',
                host: 'localhost',
                database: 'thecompany_db'
            },
        );
    try {
        await client.connect();
        const res = await client.query(thisQuery);
        const result = res.rows;
        await client.end();
        return result;
        }
    catch(err) {
        // console.error('Ups, somthing was wrong');
        console.error(err);
        }
    finally {
        await client.end();
        }
};


const addRow = async () => {
    var newDepartmentName = await inquirerDepartment();
    // console.log(newDepartmentName);
    return newDepartmentName;
}

module.exports ={viewRows, addRow};
