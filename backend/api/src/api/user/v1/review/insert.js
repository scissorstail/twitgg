module.exports = async ({ sql, params }) => {
  const query = await sql`
  INSERT INTO review (
    user_no
    , rv_positive
    , rv_content
    , rv_user_no
  ) VALUES (
    ${params.user_no}
    , ${params.rv_positive}
    , ${params.rv_content}
    , ${params.rv_user_no}
  ) RETURNING rv_no
  `;

  return {
    state: 1,
    query,
  };
};
