const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./routes/queries');
const swagger = require('./swagger');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Express API' });
});

app.get('/query/min_max_weight_yearly', db.min_max_weight_yearly);

swagger(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

