var express = require('express')
var mongodb = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1:27017/q1";
var app = express()

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index5.html")
})

app.get('/insertData',function(req,res){
    var data = req.query;
    mongodb.connect(url,function(err,db){
        if(err){
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('grades')
        collection.insert(data, function(err,result){
            if(err){
                console.log(err);
                process.exit(1);
            }
            console.log('inserted data')
            console.log(result);
            res.send("Inserted record for " + req.query.name);
        });
        db.close()
    });

});

app.get('/updateData', function(req,res){
    var stuname = req.query.name
    var stugrade = req.query.grade
    console.log(stuname)
    console.log(stugrade)
    mongodb.connect(url,function(err,db){ 
        if(err){
            console.log(err);
            process.exit(1);
        }
        var collection = db.collection('grades')
        console.log('collection')
        collection.updateOne({'name':stuname},{ $set: { 'grade': stugrade }}, function(err,result){
            if(err){
                console.log(err);
                process.exit(1);
            }
            console.log('updated')
            console.log(result)
            res.send("Updated record for " + req.query.name +". Set grade to " +req.query.grade)
        });
        db.close();
    });
});

app.listen(3000, function(){
    console.log('listening on 3000')
})