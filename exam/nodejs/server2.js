var express = require("express")
var mongodb = require("mongodb").MongoClient
var app = express()
var url = "mongodb://127.0.0.1:27017/q2"
app.get('/', function(req,res) {
    res.sendFile(__dirname + "/index2.html")
});

app.get('/getData', function(req,res) {
    var data = req.query
    if(!data.fees) {
        data.fees = 0;
    }else{
        data.fees = parseInt(data.fees)
    }

    mongodb.connect(url, function(err,db) {
        if(err){
            console.log(err)
            process.exit(1)
        }
        var collection = db.collection("examFees")
        collection.insert(data, function(err,result) {
            if(err){
                console.log(err)
                process.exit(1)
            }
            console.log("inserted record")
            console.log(result)
            res.send(result)
        });
        db.close();
    });
});

app.get('/deleteData', function(req,res) {
    mongodb.connect(url,function(err,db) {
        if(err){
            console.log(err)
            process.exit(1)
        }
        var collection = db.collection("examFees")
        res.header("content-type","text/html")
        var text = "<h2>Data of the following students will be deleted:</h2><br>"
        collection.find({fees:0}).toArray(function(err,result) {
            if(err){
                console.log(err)
                process.exit(1)
            }
            console.log('To be deleted')
            console.log(result)
            
            text+="<ul>"
            result.forEach(function(element) {
                text+= "<li>Name: " +JSON.stringify(element.name)+"</li><br>"
            });
            text+="</ul>"
            
        });
        collection.deleteMany({fees:0}, function(err,result) {
            if(err){
                console.log(err)
                process.exit(1)
            }
            console.log(result)
            text += "<h2>After Deletion</h2><br><ul>"
            collection.find({}).toArray(function(err,result) {
                if(err){
                    console.log(err)
                    process.exit(1)
                }
                result.forEach(function(element) {
                    text+= "<li>Name: " +JSON.stringify(element.name)+"</li><br>"
                });
                text+="</ul>"
                res.send(text)
            });
        });
    });
});

app.listen(3000,function(){
    console.log("Listening on 3000")
})