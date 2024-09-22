var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

function getDateObject(date) {
  let unix, utc;

  if (isNaN(date.getTime())) {
    return { error: "Invalid Date" };
  } else {
    unix = date.getTime();
    utc = date.toUTCString();
    return { unix, utc };
  }
}

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  let date = dateParam
    ? isNaN(dateParam)
      ? new Date(dateParam)
      : new Date(parseInt(dateParam))
    : new Date();

  res.json(getDateObject(date));
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
