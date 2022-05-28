module.exports = async ({ sql }) => {
  // 사용자 정보 조회
  const query = await sql`
  SELECT
    user_no
    , user_id
    , user_name
  FROM
    users
  `;

  return {
    state: 1,
    query,
  };
};
