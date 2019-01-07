
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'portfolio',
  password: 'M21Supressed',
  port: 5432,
})


const getAllCompanies = (request,response) => {
  pool.query('SELECT * from companies', (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}


const getCompanyByName = (request, response) => {

    var company_name = request.params['company_name'];
  
    pool.query('SELECT * FROM companies WHERE company_name = $1', [company_name], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    })
  }


module.exports = {getAllCompanies: getAllCompanies, getCompanyByName: getCompanyByName};