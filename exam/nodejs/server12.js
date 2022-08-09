var express = require('express')
var mongodb = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1:27017/q1"
var app = express()

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index12.html")
});

app.get('/insertData', function(req,res){
    var data = req.query;
    mongodb.connect(url, function(err, db){
        if(err){
            console.log(err)
            process.exit(1)
        }

        var collection = db.collection('q12')
        collection.insert(data,function(err,result){
            if(err){
                console.log(err)
                process.exit(1)
            }

            console.log('inserted')
            console.log(result)
            res.send("Inserted data for " + data.name +".<br><a href = '/'>Back</a>")
        });
        db.close();
    });
})

app.get('/displayData', function(req,res){
    mongodb.connect(url,function(err,db){
        if(err){
            console.log(err)
            process.exit(1)
        }
        var collection = db.collection('q12')
        collection.find({marks:{$lt:'20'}}).toArray(function(err,result){
            if(err){
                console.log(err)
                process.exit(1)
            }
            console.log('retrieved')
            console.log(result)
            var text = "<h2>Students with marks below 20</h2>"
            result.forEach(function(element){
                text += "<h3>Name: " + JSON.stringify(element.name) +"</h3>"
            });
            text+="<br><a href = '/'>Back</a>"
            res.send(text)
        })
    })
})

app.listen(3000,function(){
    console.log("3000")
})