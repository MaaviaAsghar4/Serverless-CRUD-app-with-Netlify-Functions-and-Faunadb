const errorString = require("./errorString");
const faunadb = require("faunadb"),
  dbquery = faunadb.query;
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (event, context) => {
  try {
    const createValue = JSON.parse(event.body);
    var adminClient = new faunadb.Client({
      secret: process.env.FAUNA_DB_SECRET_KEY,
    });
    const result = await adminClient.query(
      dbquery.Create(dbquery.Collection("crud_operations"), {
        data: { title: createValue },
      })
    );
    console.log(result);
    return (
      null,
      {
        statusCode: 200,
        body: JSON.stringify({ result }),
      }
    );
  } catch (error) {
    return errorString(404, { msg: "Failed to add value in database" });
  }
};
