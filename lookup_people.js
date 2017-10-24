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

const name = process.argv.slice(2)[0];

function printToConsole(results) {
  for (let i = 0; i < results.rows.length; i++) {
    console.log(`- ${i + 1}: ${results.rows[i].first_name} ${results.rows[i].last_name}, born '${results.rows[i].birthdate}'\n`);
  }
}

function retrieveData(param) {
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1", [`%${name}%`], (err, results) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${results.rowCount} person(s) by the query parameter '${name}'`);
    printToConsole(results);
    client.end();
  });
};


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("\nSearching...");
  retrieveData(name);
});