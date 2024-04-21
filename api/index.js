const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./routes/queries');
const swagger = require('./swagger');
const cors = require('cors');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get('/', (request, response) => {
  response.json({ info: 'Express API' });
});

app.get('/query/min_max_weight_yearly', db.min_max_weight_yearly);
app.get('/query/median_avg_weight_yearly', db.median_avg_weight_yearly);
app.get('/query/moms/first_year_moms', db.first_year_moms);
app.get('/query/moms/first_year_moms_count', db.first_year_moms_count);
app.get('/query/moms/older_moms', db.older_moms);
app.get('/query/moms/older_moms_count', db.older_moms_count);

swagger(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

