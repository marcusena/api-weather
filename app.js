const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const apiKey = "e6158663d216aa8a3985b1deb2d2902d";
  const query = req.body.cityName;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    apiKey +
    "&units=" +
    unit +
    "&q=" +
    query;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const description = weatherData.weather[0].description;

      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celcius. </h1>"
      );
      res.write("<p>And have " + description + " in the skies</p>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(process.env.PORT || port , (req, res) => {
  console.log(`Server is running on port ${port}`);
});
