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
 *  /query/moms/avg_first_year_moms:
 *    get:
 *      tags: [Moms]
 *      description: Get the average birth weight of first year moms
 *      responses:
 *        200:
 *          description: A successful response
 *          content: text/html
 *        500:
 *          description: Internal server error
 *          content: application/json
 *  /query/moms/avg_older_moms:
 *    get:
 *      tags: [Moms]
 *      description: Get the average birth weight of older moms
 *      responses:
 *        200:
 *          description: A successful response
 *          content: text/html
 *        500:
 *          description: Internal server error
 *          content: application/json
 */

var client = null;
function setClient(cli) {
  client = cli;
}

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


  const query = `SELECT * FROM NewerMoms LIMIT ${pageLength} OFFSET ${pageLength * (page - 1)};`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

const first_year_moms_count = (request, response) => {
  const query = `SELECT COUNT(*) FROM NewerMoms;`;
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

const avg_first_year_moms = (request, response) => {
  const query = `select
                'NEWERMOMS' as group_type,
                ROUND(AVG(CAST(NULLIF(NMBWT.alpha_value,'')as decimal)),2) as avg_weight_of_newer_moms
                from NEWERMOMSBWT as NMBWT;`
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
}

const avg_older_moms = (request, response) => {
  const query = `select
                'OLDERMOMS' as group_type,
                ROUND(AVG(CAST(NULLIF(OMBWT.alpha_value,'')as decimal )),2) as avg_weight_of_older_moms
                from OLDERMOMSBWT as OMBWT;`
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
  avg_first_year_moms,
  avg_older_moms,
  setClient
};