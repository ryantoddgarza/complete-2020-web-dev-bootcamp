require('dotenv').config();

const express = require('express');
const https = require('https');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req,res) => {
  const apiKey = process.env.OPEN_WEATHER_KEY;
  const query = req.body.city;
  const unit = 'imperial';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;

  https.get(url, (response) => {
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const city = weatherData.name;
      const temperature = weatherData.main.temp;
      const tempUnit = unit === 'metric' ? 'celcius' : 'farenheight';
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<p>The temperature in ${city} is ${temperature} degrees ${tempUnit}</p>`);
      res.write(`<p>The weather is currently ${description}</p>`);
      res.write(`<img src=${iconURL}>`);
      res.send();
    });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
