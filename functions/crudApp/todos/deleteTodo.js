const errorString = require("./errorString");
const faunadb = require("faunadb"),
  dbquery = faunadb.query;

module.exports = async (event, context) => {
  try {
    const deleteValue = JSON.parse(event.body);
    var adminClient = new faunadb.Client({
      secret: "fnAD9xIZLyACDTKYFJSjPKUjhXECK-tnxPHDLpT1",
    });
    const result = await adminClient.query(
      dbquery.Delete(
        dbquery.Ref(dbquery.Collection("crud_operations"), deleteValue.id)
      )
    );
    return (
      null,
      {
        statusCode: 200,
        body: JSON.stringify(result),
      }
    );
  } catch (error) {
    return errorString(404, { msg: "Failed to delete" });
  }
};
