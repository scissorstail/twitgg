module.exports = async ({ sql, params }) => {
  // 사용자 정보 조회
  const query = await sql`
  SELECT
    user_no
    , user_id
    , user_name
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
