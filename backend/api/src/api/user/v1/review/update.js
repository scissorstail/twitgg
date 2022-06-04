module.exports = async ({ sql, params }) => {
  const query = await sql`
  UPDATE review SET
    rv_positive = ${params.rv_positive}
    , rv_content =  ${params.rv_content}
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
