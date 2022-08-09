var express = require('express')
var mongodb = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1:27017/q1"
var app = express()

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index8.html")
});

app.get('/insertData', function(req,res) {
    var data = req.query

    mongodb.connect(url, function(err,db){
        if (err){
            console.log(err)
            process.exit(1)
        }
        var collection = db.collection('finalYears')
        collection.insert(data,function(err,result){
            if (err){
                console.log(err)
                process.exit(1)
            }
            console.log('inserted')
            console.log(result)
            res.send("Inserted data for " + data.name + "<br><a href = '/'>Back</a>")
        });
        db.close();
    })
})

app.get('/displayData', function(req,res){
    mongodb.connect(url, function(err,db){
        if (err){
            console.log(err)
            process.exit(1)
        }
        var collection = db.collection('finalYears')
        collection.find({company:"Infosys"}).toArray(function(err,result){
            if (err){
                console.log(err)
                process.exit(1)
            }
            console.log('retrieved')
            console.log(result)
            var text = "<h1>Students who are selected for Infosys</h1><ul>"
            result.forEach(function(element){
                text += "<li>Name: " + JSON.stringify(element.name) + ", USN: " + JSON.stringify(element.usn)+"</li><br>"
            });
            text += "</ul><br><a href = '/'>Back</a>"
            res.header("content-type","text/html")
            res.send(text)
        });
        db.close();
    });
});

app.listen(3000, function(){
    console.log("Listening at 3000")
});