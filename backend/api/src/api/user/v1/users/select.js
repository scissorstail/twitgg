module.exports = async ({ sql, params }) => {
  const query = await sql`
  WITH reviews AS (
    SELECT
      u.user_no
      , count(r.rv_no) FILTER(WHERE r.rv_positive = 1) AS count_positive
      , count(r.rv_no) AS count_total
      , count(r.rv_no) FILTER(WHERE r.rv_positive = 1 AND r.created_dt >= now() - INTERVAL '30 days') AS count_positive_recent
      , count(r.rv_no) FILTER(WHERE r.created_dt >= now() - INTERVAL '30 days') AS count_total_recent
    FROM review r
    JOIN users u ON r.rv_user_no = u.user_no 
    WHERE
      u.user_name = ${params.user_name}
      AND u.state = 1
      AND r.state = 1
    GROUP BY u.user_no
  ) 
  SELECT
    u.user_no
    , u.user_name
    , u.user_nick
    , u.user_provider_info -> 'photos' -> 0 ->> 'value' AS user_profile_image_url
    , COALESCE(reviews.count_positive, 0)::int4 AS count_positive
    , COALESCE(reviews.count_total, 0)::int4 AS count_total
    , COALESCE(reviews.count_positive_recent, 0)::int4 AS count_positive_recent
    , COALESCE(reviews.count_total_recent, 0)::int4 AS count_total_recent
  FROM users u
  LEFT JOIN reviews ON reviews.user_no = u.user_no  
  WHERE
    u.user_name = ${params.user_name}
    AND u.state = 1
  `;

  return {
    state: 1,
    query,
  };
};
