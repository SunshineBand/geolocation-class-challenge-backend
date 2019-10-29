const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/weather', (req, res, next) => {

  const { lat, long } = req.body;

  if (!(lat && long)) {
    res.status(400).send('Bad Request')
  }

  axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${long}?units=si`)
    .then(response => {
      const weather = {
        description: response.data.currently.summary,
        temp: response.data.currently.temperature
      }
      res.send(weather);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
    .finally(() => {
      console.log('Done!');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`))