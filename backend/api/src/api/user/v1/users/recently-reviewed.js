module.exports = async ({ sql, params }) => {
  const query = await sql`
  WITH reviews AS (
    SELECT
      u.user_no
      , count(r.rv_no) FILTER(WHERE r.rv_positive = 1 AND r.created_dt >= now() - INTERVAL '30 days') AS count_positive_recent
      , count(r.rv_no) FILTER(WHERE r.created_dt >= now() - INTERVAL '30 days') AS count_total_recent
    FROM review r
    JOIN users u ON r.rv_user_no = u.user_no 
    WHERE
      u.state = 1
      AND r.state = 1
    GROUP BY u.user_no
  ), 
  recently_reviewed AS (
    SELECT 
      r.rv_user_no
    FROM review r
    WHERE
      r.state = 1
    GROUP BY r.rv_user_no
    ORDER BY max(r.rv_no) DESC
  )
  SELECT 
    u.user_no
    , u.user_name
    , u.user_nick
    , u.user_provider_info -> 'photos' -> 0 ->> 'value' AS user_profile_image_url
    , COALESCE(reviews.count_positive_recent, 0)::int4 AS count_positive_recent
    , COALESCE(reviews.count_total_recent, 0)::int4 AS count_total_recent
  FROM recently_reviewed
  JOIN users u ON u.user_no = recently_reviewed.rv_user_no
  LEFT JOIN reviews ON reviews.user_no = u.user_no
  WHERE
    u.state = 1
  OFFSET ${params.offset} LIMIT ${params.limit}
  `;

  return {
    state: 1,
    query,
  };
};
