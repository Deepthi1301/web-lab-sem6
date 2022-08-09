var express = require('express')
var mongodb = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1:27017/q1"
var app = express()

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index10.html")
});

app.get('/insertData', function(req,res){
    var data = req.query;
    mongodb.connect(url, function(err, db){
        if(err){
            console.log(err)
            process.exit(1)
        }

        var collection = db.collection('q10')
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
});

app.get('/displayData', function(req,res){
    mongodb.connect(url,function(err,db){
        if(err){
            console.log(err)
            process.exit(1)
        }
        var collection = db.collection('q10')
        collection.find({branch:"CSE", title:"PROFESSOR"}).toArray(function(err,result){
            if(err){
                console.log(err)
                process.exit(1)
            }
            console.log('retrieved')
            console.log(result)
            var text = "<h1>Professors who are in CSE </h1><ul>"
            result.forEach(function(element){
                text += "<h3><li>Name: " + JSON.stringify(element.name) +"</li></h3><br>"
            });
            text+="</ul><br><a href = '/'>Back</a>"
            res.send(text)
        })
    })
})

app.listen(3000,function(){
    console.log("3000")
})