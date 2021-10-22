const express = require('express'),
  weather = require('../bin/weather'),
  router = express.Router();

/* GET home page. */
router.get('/', async function (req, res) {
  res.render('index');
});

router.get('/:lat,:lon', async function (req, res) {
  const weatherData = await weather.getDataWeather(req.params.lat, req.params.lon);
  res.render('weather', {
    weatherData
  });
});

module.exports = router;