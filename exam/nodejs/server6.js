var express = require('express')
var app = express()

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/index6.html");
});

app.get('/cse',function(req,res) {
    res.sendFile(__dirname + "/cse.html");
});

app.get('/ece',function(req,res) {
    res.sendFile(__dirname + "/ece.html");
});

app.get('/ise',function(req,res) {
    res.sendFile(__dirname + "/ise.html");
});

app.listen(3000, function(){
    console.log("Listening on 3000")
})