const pg = require("pg");
const settings = require("./settings");

const knex = require("knex")({
  client : 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

const name = process.argv.slice(2)[0];

function printToConsole(err, results) {
  console.log(`\nFound ${results.length} person(s) by the query parameter '${name}'`);
  for (let i = 0; i < results.length; i++) {
    console.log(`- ${i + 1}: ${results[i].first_name} ${results[i].last_name}, born '${results[i].birthdate}'\n`);
  }
  process.exit();
}

function retrieveData(param) {
  knex("famous_people")
    .on("query", () => {
      console.log("Searching...")
    })
    .on("error", (err) => {
      console.error(err);
    })
    .where("first_name", "like", `%${name}%`)
    .orWhere("last_name", "like", `%${name}%`)
    .select()
    .asCallback(printToConsole);
}


retrieveData(name);

