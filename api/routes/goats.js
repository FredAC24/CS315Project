/**
 * @swagger
 * info:
 *  title: Queries
 * paths:
 *  /query/goats/get_goat_by_tag:
 *    get:
 *      tags: [Goats]
 *      description: Gets the data of a goat by its tag
 *      parameters:
 *        - in: query
 *          name: tag
 *          schema:
 *            type: string
 *          required: true
 *          description: The goat tag
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
 *  /query/goats/get_goat_by_id:
 *    get:
 *      tags: [Goats]
 *      description: Gets the data of a goat by its id
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The goat id
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
 */

var client = null;

function setClient(cli) {
  client = cli;
}

const get_goat_by_tag = (request, response) => {
  const tag = request.query.tag;

  if (!tag) {
    response.status(400).json({ error: 'Missing required parameter: tag' });
    return;
  }

  const query = `SELECT animal_id,tag,rfid,sex,dob,sire,dam,breed,colour,weaned,prev_tag,note,note_date,status,status_date,last_weight,last_weight_date,animal_group,current_farm,current_property,current_area,breed_date,dob_date FROM Animal WHERE tag = '${tag}';`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

const get_goat_by_id = (request, response) => {
  const id = request.query.id;

  if (!id) {
    response.status(400).json({ error: 'Missing required parameter: id' });
    return;
  }

  const query = `SELECT animal_id,tag,rfid,sex,dob,sire,dam,breed,colour,weaned,prev_tag,note,note_date,status,status_date,last_weight,last_weight_date,animal_group,current_farm,current_property,current_area,breed_date FROM Animal WHERE animal_id = '${id}';`;
  client.query(query, (error, result) => {
    if (error) {
      response.status(500).json({ error: error });
    } else {
      response.status(200).json(result.rows);
    }
  });
};

module.exports = {
  get_goat_by_tag,
  get_goat_by_id,
  setClient
};