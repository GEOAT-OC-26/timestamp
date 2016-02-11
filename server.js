var express = require('express');
var app = express();
var moment = require('moment');
var fs = require('fs');
var path = require('path');

var port = process.env.PORT || 3500;

app.listen(port, function(){
  console.log("Listening on port: " + port);
});

app.use(express.static(path.join(__dirname + '/static')));

app.get('/', function(req, res) {
  var fileName = path.join(__dirname, "static", '/index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/user', function(req, res) {
  var fileName = path.join(__dirname, "static", '/user.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/examples', function(req, res) {
  var fileName = path.join(__dirname, "static", '/examples.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});



app.get('/:datestring', function(req,res) {
  var myDate;
  if(/^\d{8,}$/.test(req.params.datestring)) {
    myDate = moment(req.params.datestring, "X");
  } else {
    myDate = moment(req.params.datestring, "MMMM D, YYYY");
  }


  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
    res.send("Congratulations! It Works");
  } else {
    res.json({
      unix: null,
      natural: null
    });
    res.send("Please Try Again :)");
  }


});