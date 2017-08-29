var express = require("express");
var bodyParser = require("body-parser");

var loginsvc = require("./service/login");

var app = express();
var port = 9000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {"extend": true} ));


app.all('/auth', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
 });


app.post('/auth', function(req, res){

    loginsvc.login(req.body.email, req.body.senha , function(error, result){
           if(error){
            console.log("Error:" + error)
            res.status(401).send("E-mail ou senha incorretos!");
            res.end();
        }else{
            console.log(result);
            res.status(200).send(result);
            res.end();
        }

    });
});

app.listen(port, function() {
  console.log(`app running on ${port}`);
})