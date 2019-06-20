//Setting up environment================
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Routs================================
require("./app/routing/apiRouts")(app);
require("./app/routing/htmlRouts")(app);


//Listening function=======================
app.listen(PORT, function(){
    console.log("App is listening on PORT "+PORT);
});