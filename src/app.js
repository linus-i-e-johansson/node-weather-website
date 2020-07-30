const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeoCode = require("./utils//geoLocation");
const getWeatherData = require("./utils/getWeatherData.js");
const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Linus Johansson",
    message: "Find out the forecast for your city.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Linus Johansson",
    message: "Here is some info about me.",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page...",
    name: "Linus Johansson",
    message:
      "This is where you would find info about any problems you might have.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }
  getGeoCode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send(error);
    }
    getWeatherData(
      lat,
      long,
      (error, { temprature, feelsLike, precip, weatherIcon, humidity }) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          location: location,
          temprature: temprature,
          feelslike: feelsLike,
          precip: precip,
          weatherIcon: weatherIcon,
          humidity: humidity,
        });
      }
    );
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Linus Johansson",
    errorMsg: "Sorry, I cant find that article for you..",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Linus Johansson",
    errorMsg: "Sorry, I cant find that page for you..",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
