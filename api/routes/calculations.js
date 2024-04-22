/**
 * @swagger
 * info:
 *  title: Queries
 * paths:
 *  /query/calc/min_max_weight_yearly:
 *    get:
 *      tags: [Calculations]
 *      description: Get the minimum and maximum weight of animals by year
 *      responses:
 *        200:
 *          description: A successful response
 *          content: application/json
 *        500:
 *          description: Internal server error
 *          content: application/json
 *  /query/calc/median_avg_weight_yearly:
 *    get:
 *      tags: [Calculations]
 *      description: Get the median and average weight of animals by year
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
                ORDER BY EXTRACT(YEAR from last_weight_date) ASC;--gets min and max BY YEAR`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

const median_avg_weight_yearly = (request, response) => {
  const query = `WITH cte AS (
                    SELECT
                        AW.animal_id,
                        CASE
                            WHEN AW.last_weight ~ '[0-9]' THEN CAST(AW.last_weight AS decimal) -- cast to numeric field
                        END AS num,
                        CASE
                            WHEN AW.last_weight ~ '[a-zA-Z]' THEN AW.last_weight
                        END AS a
                    FROM
                        Animal_weight AS AW
                  )
                  SELECT
                      --AF.dob,
                      EXTRACT(YEAR from AW.last_weight_date) as Year,
                      ROUND(AVG(num),2) AS avg,
                      percentile_cont(0.5) WITHIN GROUP (ORDER BY num) AS median
                  
                  
                  FROM
                      Animal_weight AS AW
                  JOIN
                      cte ON AW.animal_id = cte.animal_id
                  where last_weight != '0.0' and last_weight!='0'
                  GROUP by EXTRACT(YEAR from AW.last_weight_date);`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};


module.exports = {
  min_max_weight_yearly,
  median_avg_weight_yearly,
  setClient
};