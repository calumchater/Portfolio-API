var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/router.js");
var app = express();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});

