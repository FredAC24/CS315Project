const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'proj'
});

client
  .connect()
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Error connecting to the database', error));

/**
 * @swagger
 * info:
 *  title: Queries
 * paths:
 *  /query/min_max_weight_yearly:
 *    get:
 *      tags: [Queries]
 *      description: Get the minimum and maximum weight of animals by year
 *      responses:
 *        200:
 *          description: A successful response
 *          content: application/json
 *        500:
 *          description: Internal server error
 *          content: application/json
 */
const min_max_weight_yearly = (request, response) => {
  const query = `SELECT
                  EXTRACT(YEAR FROM last_weight_date) AS Year,
                  MIN(CAST(NULLIF(last_weight, '') AS DECIMAL)) AS MINBYYEAR,
                  MAX(CAST(NULLIF(last_weight, '') AS DECIMAL)) AS MAXBYYEAR
                FROM
                  Animal_weight
                Where last_weight is not null
                GROUP BY
                  EXTRACT(YEAR FROM last_weight_date)
                ORDER BY EXTRACT(YEAR from last_weight_date) ASC;--gets min and max BY YEAR`
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

module.exports = { min_max_weight_yearly };