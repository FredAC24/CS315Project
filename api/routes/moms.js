/**
 * @swagger
 * info:
 *  title: Queries
 * paths:
 *  /query/moms/first_year_moms:
 *    get:
 *      tags: [Moms]
 *      description: Get the first year moms
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          required: true
 *          description: The page number
 *        - in: query
 *          name: pageLength
 *          schema:
 *            type: integer
 *          required: false
 *          description: The number of items per page
 *      responses:
 *        200:
 *          description: A successful response
 *          content: application/json
 *        500:
 *          description: Internal server error
 *          content: application/json
 *        400:
 *          description: Missing required parameter
 *          content: application/json
 *  /query/moms/first_year_moms_count:
 *    get:
 *      tags: [Moms]
 *      description: Get the total first year moms
 *      responses:
 *        200:
 *          description: A successful response
 *          content: text/html
 *        500:
 *          description: Internal server error
 *          content: application/json
 *  /query/moms/older_moms:
 *    get:
 *      tags: [Moms]
 *      description: Get the older moms
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          required: true
 *          description: The page number
 *        - in: query
 *          name: pageLength
 *          schema:
 *            type: integer
 *          required: false
 *          description: The number of items per page
 *      responses:
 *        200:
 *          description: A successful response
 *          content: application/json
 *        500:
 *          description: Internal server error
 *          content: application/json
 *        400:
 *          description: Missing required parameter
 *          content: application/json
 *  /query/moms/older_moms_count:
 *    get:
 *      tags: [Moms]
 *      description: Get the total older moms
 *      responses:
 *        200:
 *          description: A successful response
 *          content: text/html
 *        500:
 *          description: Internal server error
 *          content: application/json
 *  /query/moms/avg_moms_by_year:
 *    get:
 *      tags: [Moms]
 *      description: Averages moms by year
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

const first_year_moms = (request, response) => {
  const page = request.query.page;
  const pageLength = request.query.pageLength;

  if (!page) {
    response.status(400).json({ error: 'Missing required parameter: page' });
    return;
  }
  if (!pageLength) {
    pageLength = 100;
  }


  const query = `SELECT * FROM FirstYearMoms LIMIT ${pageLength} OFFSET ${pageLength * (page - 1)};`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

const first_year_moms_count = (request, response) => {
  const query = `SELECT COUNT(*) FROM FirstYearMoms;`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).send(result.rows[0].count);
    }
  });
};

const older_moms = (request, response) => {
  const page = request.query.page;
  const pageLength = request.query.pageLength;

  if (!page) {
    response.status(400).json({ error: 'Missing required parameter: page' });
    return;
  }
  if (!pageLength) {
    pageLength = 100;
  }

  const query = `SELECT * FROM OlderMoms LIMIT ${pageLength} OFFSET ${pageLength * (page - 1)};`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
}

const older_moms_count = (request, response) => {
  const query = `SELECT COUNT(*) FROM OlderMoms;`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).send(result.rows[0].count);
    }
  });
};

const avg_moms_by_year = (request, response) => {
  const query = `SELECT
                    'FIRST YEAR MOMS' as MOM_TYPE,
                    ROUND(AVG(CAST(NULLIF(AW.last_weight,'') AS DECIMAL)), 2) AS AVG_Weight_of__dams
                  FROM FirstYearMoms as FM
                  join Animal_weight as AW on AW.animal_id = FM.animal_id
                  UNION ALL
                  select
                    'OLDER MOMS' as MOM_TYPE,
                    ROUND(AVG(CAST(NULLIF(AW.last_weight,'') AS DECIMAL)),2) AS AVG_Weight_of__dams
                  FROM OlderMoms as OM
                  join Animal_weight as AW on AW.animal_id = OM.animal_id;`
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
}


module.exports = {
  first_year_moms,
  first_year_moms_count,
  older_moms,
  older_moms_count,
  avg_moms_by_year,
  setClient
};