var express = require("express")
var app = express()

app.get('/',function(req,res){
    var text = `<h1>Welcome!<br />
    You have reached our homepage</h1>
    <p>
        <a href = "/registrations">Registrations</a><br />
        <a href = "/announcement">Announcements</a><br />
        <a href = "/contact">Contact Us</a><br />`
        res.send(text)
});

app.get("/registrations", function(req,res){
    var text = `<h1>Registrations</h1>
    <h3>Enter your name: <input type = "text" /><br />
    Enter your age: <input type = "text" /><br /></h3>`
    res.header("content-type","text/html");
    res.send(text);
});

app.get("/announcement", function(req,res){
    var text = `<h1>This is the announcements page</h1>
    <ul>
    <h3><li>Training classes start on 15-01-2015</li><br /></h3></ul>`
    res.header("content-type","text/html");
    res.send(text);
});

app.get("/contact", function(req,res){
    var text = `<h1>Contact Us!</h1>
    <h3>Email:<a href = "#">abc@gmail.com</a><br />
    Phone: 25421000<br /></h3></ul>`
    res.header("content-type","text/html");
    res.send(text);
});

app.listen(3000, function(){
    console.log("Listening on 3000")
});