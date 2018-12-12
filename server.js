// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date?", function(req, res){
  
  var date = null;
  //parsing date string
  if (req.params.date !== undefined){

    var unixTimestamp = parseInt(req.params.date*1); //checking if date submitted is unix time stamp
    if (isNaN(unixTimestamp)) { //is not a unix time stamp
      submitted_date = new Date(req.params.date);
    }
    else { //it is a timestamp
      submitted_date = new Date(unixTimestamp);
    }
  }
  else //string is empty, give current time
  {
    submitted_date = new Date(Date.now());
  }

  if (date == "Invalid Date"){
    res.json("invalid date");
  } else{
    res.json({"unix": submitted_date.getTime(), "utc": submitted_date.toUTCString()});
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});