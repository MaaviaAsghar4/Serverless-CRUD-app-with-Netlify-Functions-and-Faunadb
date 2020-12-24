const errorString = require("./errorString");
const faunadb = require("faunadb"),
  dbquery = faunadb.query;

module.exports = async (event, context) => {
  try {
    // const readVloalue = JSON.parse(event.body);
    var adminClient = new faunadb.Client({
      secret: "fnAD9xIZLyACDTKYFJSjPKUjhXECK-tnxPHDLpT1",
    });
    const result = await adminClient.query(
      dbquery.Map(
        dbquery.Paginate(dbquery.Match(dbquery.Index("crud_index"))),
        dbquery.Lambda("X", dbquery.Get(dbquery.Var("X")))
      )
    );
    return (
      null,
      {
        statusCode: 200,
        body: JSON.stringify({ result }),
      }
    );
  } catch (error) {
    return errorString(404, { msg: "Failed to Read" });
  }
};
