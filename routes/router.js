
var companies = require('./companies');
var favourites = require('./favourites');
var stocks = require('./stocks');
var users = require('./users');

var appRouter = function (app) {

    app.get("/", function (req, res) {
      res.status(200).send({ message: 'Portfolio App API' });
    });
  

   // Check if username available by getting all users - working
   app.get("/users/", users.getAllUsers);

   // Get a user's favourites - working
   app.get("/favourites/users/:username",favourites.getFavouritesByUsername);

   // Add a favourite for a user 
   app.post('/favourites/:company_name/users/:username', favourites.postFavourites);

   // Get all companies - working
   app.get("/companies", companies.getAllCompanies);

    // Get latest stock value for company 
    app.get("/stocks/companies/:company_name", stocks.getLatestStockValueForCompany);

   // Get a company - working
   app.get("/companies/:company_name", companies.getCompanyByName);

   // Stock amount 
   app.put("/favourites/users/:username/companies/:company_id/:stock_amount", favourites.updateStockAmount);

    // Stocks for time period - working
   app.get("/stocks/:date/companies/:company_name", stocks.getStocksForTimePeriod);

   // Latest portfolio valuation - working
   app.get("/portfolio/users/:username",stocks.getTotalStockValuation);

   // GDPR Compliance
   //app.delete("/users/:username")


  }
  
  module.exports = appRouter;