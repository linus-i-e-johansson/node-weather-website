const request = require("request");

const getWeatherData = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4c2c32abf38ff67508061d42c1a23fca&query=${encodeURIComponent(
    lat
  )},${encodeURIComponent(long)}`;
  request({ url, json: true }, (error, { body }) => {
    console.log(body);
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        weatherSummary: body.current.weather_descriptions[0],
        temprature: body.current.temperature,
        feelsLike: body.current.feelslike,
        precip: body.current.precip,
        weatherIcon: body.current.weather_icons[0],
        humidity: body.current.humidity,
      });
    }
  });
};
module.exports = getWeatherData;
