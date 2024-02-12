// index.js
// where your node app starts

// init project
import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
const __dirname = import.meta.dirname;

const app = express();
app.use(express.static('public'));
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?",(req,res)=>{
  const url = req.params;
  if (url.date.length > 10){
    const futureDate = new Date();
    futureDate.setTime(url.date);
    console.log(futureDate.toUTCString());
    res.json({"unix":Date.parse(futureDate),'utc':futureDate.toUTCString()})
  }else{
    const options = {
      weekday:'short',
      year:'numeric',
      month:'long',
      day:'numeric'
    };
    console.log(url[url.date]);
    const data = new Date(`${url.date}`).toUTCString();
    if (data === "Invalid Date") {
      res.json({ error : "Invalid Date" });
    }else{
    res.json({
      'unix':Date.parse(url.date),
      "utc":data
    });
  }}
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000); 
});
