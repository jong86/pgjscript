const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("rows[0].number:", result.rows[0].number); // output: 1

    console.log("result:", result);
    
    
    client.end();
  });
});