// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment')
var app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/description.html');
});

app.get("/:date", function (request, response) {
  var json = {"unix": null, "natural": null};
  var date = moment.unix(Number(request.params.date));
  console.log(date);
  if(date.isValid()){
    json.unix = date.unix();
    json.natural = date.format("dddd, MMMM Do YYYY");
    //json.natural = date.getFullYear();
  } else {
    date = moment(request.params.date);
    if(date.isValid()){
      json.unix = date.unix();
      json.natural = date.format("dddd, MMMM Do YYYY");
    }
  }
  response.send(json);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
