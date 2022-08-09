var express = require('express')
var mongodb = require('mongodb').MongoClient;
var app = express();

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index1.html');
});

app.get('/getData', function(req,res) {
    var data = req.query;
    console.log(data);

    mongodb.connect("mongodb://127.0.0.1:27017/q1", function(err, db){
        if(err) {
            console.log(err);
            process.exit(1);
        } else {
            var collection = db.collection('cie_marks')
            collection.insert(data, function(err, result){
                if(err) {
                    console.log(err);
                    process.exit(1);
                } else{
                    console.log('inserted data')
                    res.send(result)
                }       
        });
        }
       
    });
});

app.get("/showData", function(req,res){
    mongodb.connect("mongodb://127.0.0.1:27017/q1", function(err,db) {
        if(err) {
            console.log(err);
            process.exit(1);
        } else{
            var collection = db.collection('cie_marks')
            

            collection.find({marks: {$lt : '20'}}).toArray(function(err, result){
                if (err) {
                    console.log(err);
                    process.exit(1);
                } else {
                    var text = "<h2>Students with less than 20 in CIE</h2><ul>";
                    res.header("content-type", "text/html");
                    console.log(result);
                    result.forEach((element) => {
                        text += "<li> Name: " + JSON.stringify(element.name) + "  , Marks: " + JSON.stringify(element.marks) + "</li>";
                    });
                    text += "</ul>";
                    res.send(text);
                    db.close();
                }
            });
        }
    });
});


// app.get("/showData", (req, res) => {
//     //Get student with less then 20 marks
//     mongodb.connect("mongodb://127.0.0.1:27017/q1", (err, db) => {
//         if (err) {
//             console.log(err);
//             process.exit(1);
//         }
//         var collection = db.collection('students');
//         var query = { marks: { $lt: 20 } };
//         collection.find(query).toArray((err, result) => {
//             if (err) {
//                 console.log(err);
//                 process.exit(1);
//             }
//             var text = "<h2>Students with less then 20 marks</h2> <br>";
//             text += "<ul>"
//             res.header("content-type", "text/html");
//             result.forEach(element => {
//                 text += "<li>" + JSON.stringify(element) + "</li>";
//             });
//             text += "</ul>";
//             res.send(text);
//             db.close();
//         })
//     })
// })
app.listen(3000, function(){
    console.log("Listening on port 3000")
})