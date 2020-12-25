const errorString = require("./errorString");
const faunadb = require("faunadb"),
  dbquery = faunadb.query;

var dotenv = require("dotenv");
dotenv.config();
module.exports = async (event, context) => {
  try {
    // const readVloalue = JSON.parse(event.body);
    var adminClient = new faunadb.Client({
      secret: process.env.FAUNA_DB_SECRET_KEY,
    });
    const result = await adminClient.query(
      dbquery.Map(
        dbquery.Paginate(dbquery.Match(dbquery.Index("crud_index"))),
        dbquery.Lambda("X", dbquery.Get(dbquery.Var("X")))
      )
    );
    console.log(result);
    const newData = result.data.map((value) => {
      return {
        id: value.ref.id,
        data: value.data.title,
      };
    });
    console.log(newData);
    return (
      null,
      {
        statusCode: 200,
        body: JSON.stringify({ newData }),
      }
    );
  } catch (error) {
    return errorString(404, { msg: "Failed to Read" });
  }
};
