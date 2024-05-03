const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const moms = require('./routes/moms');
const calc = require('./routes/calculations');
const dams = require('./routes/dams');
const goats = require('./routes/goats');
const twins = require('./routes/twins');

const swagger = require('./swagger');
const cors = require('cors');

const { Client } = require('pg');

// connects to postgres
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

// add cors
app.use(cors());

// default route
app.get('/', (request, response) => {
  response.json({ info: 'Express API' });
});

// connect to the database
client
  .connect()
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Error connecting to the database', error));

// pass the client to the routes stored in other files
calc.setClient(client);
moms.setClient(client);
dams.setClient(client);
goats.setClient(client);
twins.setClient(client);

// routes
// sets the api functions to specific routes
// functions found in ./routes/*.js
app.get('/query/calc/min_max_weight_yearly', calc.min_max_weight_yearly);
app.get('/query/calc/median_avg_weight_yearly', calc.median_avg_weight_yearly);
app.get('/query/moms/first_year_moms', moms.first_year_moms);
app.get('/query/moms/first_year_moms_count', moms.first_year_moms_count);
app.get('/query/moms/older_moms', moms.older_moms);
app.get('/query/moms/older_moms_count', moms.older_moms_count);
app.get('/query/moms/avg_first_year_moms', moms.avg_first_year_moms);
app.get('/query/moms/avg_older_moms', moms.avg_older_moms);
app.get('/query/dams/avg_weight_of_parent_yearly', dams.avg_weight_of_parent_yearly);
app.get('/query/goats/get_goat_by_tag', goats.get_goat_by_tag);
app.get('/query/goats/get_goat_by_id', goats.get_goat_by_id);
app.get('/query/twins/birth/avg_weight_of_all_types', twins.avg_weight_of_all_types);
app.get('/query/twins/birth/avg_weight_singles_yearly', twins.avg_weight_singles_yearly);
app.get('/query/twins/birth/avg_weight_twins_yearly', twins.avg_weight_twins_yearly);
app.get('/query/twins/birth/avg_weight_triplets_yearly', twins.avg_weight_triplets_yearly);
app.get('/query/twins/current/avg_weight_of_all_types', twins.avg_weight_of_all_types_current);
app.get('/query/twins/current/avg_weight_singles_yearly', twins.avg_weight_of_singles_current);
app.get('/query/twins/current/avg_weight_twins_yearly', twins.avg_weight_of_twins_current);
app.get('/query/twins/current/avg_weight_triplets_yearly', twins.avg_weight_of_triplets_current);

// creates the swagger page for the api using options from swagger.js
swagger(app);

// listen on port 3000
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

