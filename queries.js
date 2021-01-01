/*
POOL ARE YOUR CONFIGURATION OPTIONS FOR PSQL
YOU"LL NEED TO PASS THE USER, HOST, DB, PWD, AND PORT.

WHEN RUNNING YOUR QUERIES, YOU"LL PASS YOUR PSQL COMMANDS THROUGH 
pool.query() 
*/
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'john',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})




// GET /  displayHome()



// GET /users  getUsers()

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

// GET /users/:id  getUserById()  id=$1 is a placeholder instead of ?

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

// POST users  createUser()

const createUser = (request, response) => {
    const { name, email } = request.body;


    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID: ${results.id}`);
    })
}

// PUT /users/:id  updateUser()

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    )
}

// DELETE /users/:id  deleteUser()

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}