module.exports = async ({ sql, params }) => {
  const query = await sql`
  UPDATE review SET
    rv_positive = COALESCE(${params.rv_positive}, rv_positive)
    , rv_content = COALESCE(${params.rv_content}, rv_content)
    , state = COALESCE(${params.state}, state)
    , updated_dt = now()
  WHERE
    rv_no = ${params.rv_no}
    AND user_no = ${params.user_no}
    AND state = 1
  RETURNING rv_no
  `;

  return {
    state: 1,
    query,
  };
};
