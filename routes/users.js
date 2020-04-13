
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'portfolio',
  password: 'password',
  port: 5432,
})


const getAllUsers = (request,response) => {
  pool.query('SELECT username FROM users', (error, results) => {
    if(error) {
      throw error ;
    }
    response.status(200).json(results.rows);
  })
}



module.exports = {getAllUsers: getAllUsers};
