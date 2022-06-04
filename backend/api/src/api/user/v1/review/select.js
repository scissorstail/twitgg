module.exports = async ({ sql, params }) => {
  const query = await sql`
  SELECT
    r.rv_no
    , r.rv_positive
    , r.rv_content
    , r.rv_user_no
    , r.created_dt
    , r.updated_dt
    , u.user_no
    , u.user_name
    , u.user_provider_info -> 'photos' -> 0 ->> 'value' AS user_profile_image_url
  FROM review r
  JOIN users u ON u.user_no = r.user_no
  WHERE
    r.rv_user_no = ${params.rv_user_no}
    AND u.user_no = COALESCE(${params.user_no}, u.user_no)
    AND r.state = 1
  ORDER BY r.rv_no DESC
  OFFSET ${params.offset} LIMIT ${params.limit}
  `;

  return {
    state: 1,
    query,
  };
};
