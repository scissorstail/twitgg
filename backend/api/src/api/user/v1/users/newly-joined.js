module.exports = async ({ sql, params }) => {
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
