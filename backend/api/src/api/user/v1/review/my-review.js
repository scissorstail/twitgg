const Joi = require('joi');

module.exports = async ({ sql, params: _params }) => {
  const params = await Joi.object({
    user_no: Joi
      .number()
      .integer()
      .positive(),
    offset: Joi
      .number()
      .integer()
      .min(0)
      .required(),
    limit: Joi
      .number()
      .integer()
      .min(0)
      .required(),
  }).validateAsync(_params);

  const query = await sql`
  SELECT
    r.rv_no
    , r.rv_positive
    , r.rv_content
    , r.created_dt
    , r.updated_dt
    , u1.user_no AS rv_user_no
    , u1.user_name AS rv_user_name
    , u1.user_nick AS rv_user_nick
    , u1.user_provider_info -> 'photos' -> 0 ->> 'value' AS rv_user_profile_image_url
  FROM review r
  JOIN users u1 ON u1.user_no = r.rv_user_no 
  JOIN users u2 ON u2.user_no = r.user_no
  WHERE
    r.user_no = ${params.user_no}
    AND r.state = 1
    AND u1.state = 1
    AND u2.state = 1
  ORDER BY r.rv_no DESC
  OFFSET ${params.offset} LIMIT ${params.limit}
  `;

  return {
    state: 1,
    query,
  };
};
