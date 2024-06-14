const { Client } = require('pg');

const viewAllRoles = async () => {
    const client = new Client(
            {
                user: 'postgres',
                password: 'B00tP0st1212',
                host: 'localhost',
                database: 'thecompany_db'
            },
        );
    try {
        await client.connect();
        const res = await client.query(`
            select role.title, role.salary, department.name
            from role
            join department on role.department_id = department.id 
        `);
        // console.log(res);
        const result = res.rows;
        await client.end();
        return result;
        }
    catch(err) {
        console.error('Ups, somthing was wrong');
        }
    finally {
        await client.end();
        }
};

module.exports ={viewAllRoles};
