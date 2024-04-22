const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const moms = require('./routes/moms');
const calc = require('./routes/calculations');

const swagger = require('./swagger');
const cors = require('cors');

const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'proj'
});

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

client
  .connect()
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Error connecting to the database', error));

calc.setClient(client);
moms.setClient(client);

app.get('/query/calc/min_max_weight_yearly', calc.min_max_weight_yearly);
app.get('/query/calc/median_avg_weight_yearly', calc.median_avg_weight_yearly);
app.get('/query/moms/first_year_moms', moms.first_year_moms);
app.get('/query/moms/first_year_moms_count', moms.first_year_moms_count);
app.get('/query/moms/older_moms', moms.older_moms);
app.get('/query/moms/older_moms_count', moms.older_moms_count);

swagger(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

