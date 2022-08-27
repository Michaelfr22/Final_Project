var pg = require("pg");
var config = require("./config.json");
var host = config.host;
var user = config.username;
var pass = config.password;
var port = config.port;

var conString = "postgres://"+user+":"+pass+"@"+host+":"+port+"/us-emissions-db";


var client = new pg.Client(conString);
client.connect();


var query = client.query("SELECT * FROM gdp_emissions limit 10");

query.on("row", function(row,result){
    result.addRow(row);
    });

client.end();
