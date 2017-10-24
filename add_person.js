// Usage: node add_person.js <first_name> <last_name> <date_of_birth>

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
  },
  useNullAsDefault: true
});

const newPerson = {};
newPerson.first_name = process.argv.slice(2)[0];
newPerson.last_name = process.argv.slice(2)[1];
newPerson.birthdate = process.argv.slice(2)[2];

function insertPerson(newPerson) {
  knex('famous_people').insert(newPerson).then(function() {
    console.log("Insertion complete.");
    process.exit();
  })
}

insertPerson(newPerson);