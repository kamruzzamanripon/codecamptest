var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use("/", (req, res, next) => {
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
});


app.use("/public", express.static(__dirname + "/public"));

app.get("/now", (req, res, next)=> {
req.time = new Date().toString();
next();
}, (req, res)=> {
  res.send({"time": req.time})
});

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

/** 6) Use the .env file to configure the app */
// in dot env file
app.get("/json", (req, res) => {
 var jsonResponse = {"message":"Hello json"};
 if(process.env.MESSAGE_STYLE === "uppercase"){
   jsonResponse.message = jsonResponse.message.toUpperCase();
 }

 res.json(jsonResponse)
});


app.get("/:word/echo", (req, res)=>{
  const {word}=req.params;
  res.json({"echo": word})
});

app.route("/name")
.get((req, res)=> {
  const {first: firstname, last: lastname} = req.query; 
  res.json({"name": `${firstname} ${lastname}`})})
  .post((req, res)=>{
const {first: firstname, last: lastname} = req.body;
res.json({"name": `${firstname} ${lastname}`})
  });







module.exports = app;
