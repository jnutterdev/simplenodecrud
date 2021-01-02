const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'john',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});



// GET /  displayHome()

exports.displayHome = async(request, response) => {
    await response.render('./partials/home');
}

// GET /users  getUsers()

exports.getUsers = async(request, response) => {

    try {

        const results = await pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error;
            }
            // response.status(200).json(results.rows);
            response.render('./partials/users', { users: results.rows });
        })

    } catch (err) {
        return next(err);
    }
}

// GET /users/:id  getUserById()  id=$1 is a placeholder instead of ?

exports.getUserById = async(request, response) => {


    try {
        const id = parseInt(request.params.id);
        const results = await pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        })

    } catch (err) {
        return next(err);
    }
}



// POST users  createUser()

exports.newUser = async(request, response) => {
    await response.render('../views/partials/newuser');
}

exports.createUser = (request, response) => {


    try {
        const { name, email } = request.body;
        pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
            if (error) {
                throw error;
            }
            response.render('../views/partials/useradded', { user: `${name}` });
        })
    } catch (err) {
        return next(err);
    }


}

// PUT /users/:id  updateUser()



exports.updateUser = (request, response) => {

    try {
        const id = parseInt(request.params.id);
        const { name, email } = request.body;
        pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id],
            (error, results) => {
                if (error) {
                    throw error;
                }
                response.render('../views/partials/userupdated');
            }
        )
    } catch (err) {
        return next(err);
    }

}

// DELETE /users/:id  deleteUser()

exports.deleteUser = (request, response) => {

    try {
        const id = parseInt(request.params.id);

        pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User deleted with ID: ${id}`);
        })

    } catch (err) {
        return next(err);
    }


}