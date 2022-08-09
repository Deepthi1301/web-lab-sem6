var express = require('express')
var path = require('path')
var mongodb = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1:27017/mern"
var bodyParser = require('body-parser')
const { mongo } = require('mongoose')

var app = express()
var srcpath = path.join(__dirname,'/public')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'))

function getGrade(p){
    if(p>=90){
        return "S"
    } else if(p>=80){
        return "A"
    } else if(p>=70){
        return "B"
    }else if(p>=60){
        return "C"
    }else if(p>=50){
        return "D"
    }else if(p>=40){
        return "E"
    }else {
        return "F"
    }
}

app.get('/', function(req,res){
    res.sendFile(srcpath+'/index.html')
});

app.get('/insertData', function(req,res){
    res.sendFile(srcpath+"/insert.html")
});

app.post('/api/addData', function(req,res){
    var data = req.query;
    mongodb.connect(url,function(err,db){
        if(err){
            console.log(err)
            process.exit(1)
        }
        data.grade = getGrade(parseInt(data.percentage))
        data.grade = data.grade.toUpperCase
        var collection = db.collection('grades')
        collection.insert(data, function(err,result){
            if(err){
                console.log(err)
                res.json({
                    "status" : "error",
                    "message" : err
                });
            } else {
                data.serverMessage = "Data inserted successfully";
                res.header("content-type","application/json")
                res.json({
                    "status":"success",
                    
                });
            }
            db.close();
        });
    });
});

app.get("/viewData", function(req,res){
    mongodb.connect(url,function(err,db){
        if(err){
            console.log(err)
            process.exit(1)
        }
        var collection = db.collection('grades')
        collection.find({grade:"S"}).toArray(function(err,result){
            if(err){
                console.log(err)
                process.exit(1)
            }

            if(result.length == 0){
                res.send("No records found")
            } else {
                var text = "<h1>Students with S grade</h1><ul>"
                result.forEach(function(element){
                    text += "<li>Name: "+JSON.stringify(element.name) +" USN: "+JSON.stringify(element.name)+"</li><br />"
                });
                res.header("content-type","text/html")
                res.send(text);
            }
        })
    })
})

app.listen(3000, function(){
    console.log("Listening on 3000")
})