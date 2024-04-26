/**
 * @swagger
 * info:
 *  title: Queries
 * paths:
 *  /query/twins/avg_weight_of_all_types:
 *    get:
 *      tags: [Twins]
 *      description: Get the average weight of singles, twins, and triplets.
 *      responses:
 *        200:
 *          description: A successful response
 *          content: application/json
 *        500:
 *          description: Internal server error
 *          content: application/json
 *  /query/twins/avg_weight_singles_yearly:
 *    get:
 *      tags: [Twins]
 *      description: Get the average weight of singles by year
 *      responses:
 *        200:
 *          description: A successful response
 *          content: application/json
 *        500:
 *          description: Internal server error
 *          content: application/json
 *  /query/twins/avg_weight_twins_yearly:
 *    get:
 *      tags: [Twins]
 *      description: Get the average weight of twins by year
 *      responses:
 *        200:
 *          description: A successful response
 *          content: application/json
 *        500:
 *          description: Internal server error
 *          content: application/json
 *  /query/twins/avg_weight_triplets_yearly:
 *    get:
 *      tags: [Twins]
 *      description: Get the average weight of triplets by year
 *      responses:
 *        200:
 *          description: A successful response
 *          content: application/json
 *        500:
 *          description: Internal server error
 *          content: application/json
 */

var client = null;

function setClient(cli) {
  client = cli;
}

const avg_weight_of_all_types = (request, response) => {
  const query = `SELECT 'Singles' AS group_type,
                  ROUND(AVG(alpha_value::numeric), 2) as average
                FROM actualsingles
                  NATURAL JOIN birth_weights
                UNION ALL
                SELECT 'Twins' as group_type,
                  ROUND(AVG(alpha_value::numeric), 2) as average
                FROM actualtwins
                  NATURAL JOIN birth_weights
                UNION ALL
                SELECT 'Triplets' as group_type,
                  ROUND(AVG(alpha_value::numeric), 2) as average
                FROM actualtriplets
                  NATURAL JOIN birth_weights;
                `;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

const avg_weight_singles_yearly = (request, response) => {
  const query = `SELECT EXTRACT(YEAR FROM dob) as year,
                  ROUND(AVG(alpha_value::numeric), 2) as average
                FROM actualsingles
                  NATURAL JOIN birth_weights
                GROUP BY year`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

const avg_weight_twins_yearly = (request, response) => {
  const query = `SELECT EXTRACT(YEAR FROM dob) as year,
                  ROUND(AVG(alpha_value::numeric), 2) as average
                FROM actualtwins
                  NATURAL JOIN birth_weights
                GROUP BY year`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

const avg_weight_triplets_yearly= (request, response) => {
  const query = `SELECT EXTRACT(YEAR FROM dob) as year,
                  ROUND(AVG(alpha_value::numeric), 2) as average
                FROM actualtriplets
                  NATURAL JOIN birth_weights
                GROUP BY year;`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};


module.exports = {
  avg_weight_of_all_types,
  avg_weight_singles_yearly,
  avg_weight_twins_yearly,
  avg_weight_triplets_yearly,
  setClient
};