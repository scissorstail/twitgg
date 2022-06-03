module.exports = async ({ sql, params }) => {
  // 사용자 정보 조회
  const query = await sql`
  SELECT
    user_no
    , user_name
    , user_nick
    , user_provider_info -> 'photos' -> 0 ->> 'value' AS user_profile_image_url
  FROM
    users
  WHERE
    user_no = ${params.user_no}
    AND state = 1
  `;

  return {
    state: 1,
    query,
  };
};
