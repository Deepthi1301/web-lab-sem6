var express = require("express")
var mongodb = require("mongodb").MongoClient
var url = "mongodb://127.0.0.1:27017/q1"
var app = express()

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index3.html")
});

app.get("/insertData", function(req,res) {
    mongodb.connect(url,function(err,db) {
        if(err){
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection("HR")
        var data = req.query
        collection.insert(data, function(err,result){
            if(err){
                console.log(err);
                process.exit(1);
            }
            console.log("inserted record")
            console.log(result)

            res.send(result)
        });
        db.close();
    });
})

app.get("/showEmployees", function(req,res){
    mongodb.connect(url,function(err,db) {
        if(err){
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection("HR")
        collection.find({salary : { $gt : '50000' } }).toArray(function(err,result){
            if(err){
                console.log(err);
                process.exit(1);
            }
            var text = "<h1>Employees with salary greater 50000</h1>"
            console.log(result)
            text +="<ul>"
            result.forEach(function(element) {
                text += "<li> Name: " + JSON.stringify(element.name) + " Salary: " + JSON.stringify(element.salary) + "</li><br />"
            });
            text += "</ul>"
            res.header("content-type","text/html");
            res.send(text);
        })
       
    });
});

app.listen(3000, function(){
    console.log("Listening on port 3000");
});