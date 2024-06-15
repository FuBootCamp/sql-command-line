// const { inquirerDepartment } = require('./inquirer');
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


const addRow = async (thisQuery) => {
    // var newDepartmentName = await inquirerDepartment();
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
    const result = res;
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
    // console.log(newDepartmentName);
    return;
}

module.exports ={viewRows, addRow};
