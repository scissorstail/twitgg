const Joi = require('joi');

module.exports = async ({ sql, params: _params }) => {
  const params = await Joi.object({
    offset: Joi
      .number()
      .integer()
      .min(0)
      .max(100)
      .required(),
    limit: Joi
      .number()
      .integer()
      .min(0)
      .max(100)
      .required(),
  }).validateAsync(_params);

  const query = await sql`
  SELECT
    u.user_no
    , u.user_name
    , u.user_nick
    , u.user_provider_info -> 'photos' -> 0 ->> 'value' AS user_profile_image_url
    , u.created_dt
  FROM users u
  WHERE
    u.state = 1
  ORDER BY u.user_no DESC
  OFFSET ${params.offset} LIMIT ${params.limit}
  `;

  return {
    state: 1,
    query,
  };
};
