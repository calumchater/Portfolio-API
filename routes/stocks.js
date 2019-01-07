
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'portfolio',
  password: 'M21Supressed',
  port: 5432,
})

// Get latest portfolio valuation 


const getTotalStockValuation = (request, response) => {

    var username = request.params.username;

    pool.query('SELECT f.stock_amount, c.company_name, s.stock_value FROM favourites AS f INNER JOIN companies AS c ON f.fav_company_id=c.company_id INNER JOIN stocks AS s ON s.stock_company_id=c.company_id WHERE f.username_fav=$1 AND f.stock_amount>0 AND s.stock_date=(SELECT MAX(stock_date) from stocks)', [username], (error, results) => {
        if(error) {
          throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getLatestStockValueForCompany  = (request,response) => {
    
    var company_name = request.params.company_name;

    pool.query('SELECT s.stock_value FROM stocks AS s INNER JOIN companies AS c ON c.company_id=s.stock_company_id WHERE c.company_name=$1 AND s.stock_date=(SELECT MAX(stock_date) from stocks)', [company_name], (error,results) => {
        if(error) {
            throw error;
          }
          response.status(200).json(results.rows);
    })
}

const getStocksForTimePeriod = (request,response) => {

    var company_name = request.params.company_name;
    var date = request.params.date;

    pool.query('SELECT * FROM stocks AS s INNER JOIN companies AS c ON c.company_id=s.stock_company_id WHERE c.company_name=$1 AND s.stock_date>$2 ORDER BY s.stock_date', [company_name,date], (error,results) => {
        if(error) {
            throw error;
          }
          response.status(200).json(results.rows);
    })
}

module.exports = {
    getTotalStockValuation: getTotalStockValuation,
     getStocksForTimePeriod: getStocksForTimePeriod,
     getLatestStockValueForCompany: getLatestStockValueForCompany
    };