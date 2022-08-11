const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "nextjs",
    password: "sincan2003",
    database: "fullstacknextjs",
  },
});

export default knex;
