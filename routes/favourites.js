
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'portfolio',
  password: 'M21Supressed',
  port: 5432,
})


const getFavouritesByUsername = (request, response) => {

    var username = request.params.username;

    pool.query('SELECT *, s.stock_value FROM companies AS c INNER JOIN favourites AS f ON f.fav_company_id=c.company_id INNER JOIN stocks AS s ON s.stock_company_id=c.company_id WHERE f.username_fav=$1 AND s.stock_date=(SELECT MAX(stock_date) from stocks)', [username], (error, results) => {
      if (error) {
        throw error;
      } else {
      response.status(200).json(results.rows);
      }
    })
  }

  //   app.put("/favourites/users/:username/companies/:company_id/:stock_amount", favourites.updateStockAmount);

const updateStockAmount = (request, response) => {
  
  var username = request.params.username;
  var company_id = request.params.company_id;
  var stock_amount = request.params.stock_amount;

  pool.query('UPDATE favourites SET stock_amount=$1 WHERE favourites.username_fav=$2 AND company_id=$3', [stock_amount,username,company_id], (error, results) => {
    if (error) {
      throw error;
    } else {
    response.status(200).json(results.rows);
    }
  }
  
  )

}

const postFavourites = (request, response) => {

    var username = request.body.username_fav;
    var stock_amount = request.body.stock_amount;
    var company_id = request.body.company_name;    

    pool.query('INSERT INTO favourites (stock_amount, username_fav, fav_company_id) values ({$1}, {$2}, {$3});', [stock_amount,username,company_id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Favourites list added with id : ${results.insertId}`)
    })
  }

module.exports = {getFavouritesByUsername: getFavouritesByUsername,postFavourites: postFavourites, updateStockAmount: updateStockAmount};