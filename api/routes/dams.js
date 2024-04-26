/**
 * @swagger
 * info:
 *  title: Queries
 * paths:
 *  /query/dams/avg_weight_of_parent_yearly:
 *    get:
 *      tags: [Dams]
 *      description: Get average weight of parents yearly
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

const avg_weight_of_parent_yearly = (request, response) => {
  const query = `select
                  F.birth_year,
                  ROUND(AVG(F.current_year),1) as avg_year,
                  ROUND(AVG(CAST(NULLIF(aw.last_weight,'')as DECIMAL)),2) as Average_weight_of_female_dam
                from Female_goats_dam as F
                join Animal_weight as AW on AW.animal_id = F.animal_id
                where F.birth_year <= 2023
                group by birth_year
                order by birth_year ASC;`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

module.exports = {
  avg_weight_of_parent_yearly,
  setClient
};