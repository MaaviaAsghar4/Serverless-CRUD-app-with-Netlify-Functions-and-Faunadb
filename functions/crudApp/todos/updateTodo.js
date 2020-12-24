const errorString = require("./errorString");
const faunadb = require("faunadb"),
  dbquery = faunadb.query;

module.exports = async (event, context) => {
  try {
    const updateValue = JSON.parse(event.body);
    var adminClient = new faunadb.Client({
      secret: "fnAD9xIZLyACDTKYFJSjPKUjhXECK-tnxPHDLpT1",
    });
    const result = await adminClient.query(
      dbquery.Update(
        dbquery.Ref(dbquery.Collection("crud_operations"), updateValue.id),
        { data: { title: updateValue.content } }
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
    return errorString(404, { msg: "Failed to update" });
  }
};
