var express = require('express')
var app = express()
var count=0
function logger(req,res,next){
    var timestamp = new Date().toLocaleString();
    var url = req.protocol + "://"+ req.get("host") + req.originalUrl
    console.log(timestamp + "  " +url)
    console.log("Method: " + req.method)
    next();
}

function counter(req,res,next){
    count++;
    console.log("Visit count: " + count)
    next();
}

app.use(logger);
app.use(counter);

app.get('/', function(req,res){
    res.send("<h1>Hello World!</h1>")
});

app.listen(3000, function(){
    console.log("Listening on 3000");
})