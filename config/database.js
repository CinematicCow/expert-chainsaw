const { parse } = require("pg-connection-string");
require("dotenv").config();

if (process.env.DATABASE_URL) {
  module.exports = ({ env }) => {
    const { host, port, database, user, password } = parse(env("DATABASE_URL"));

    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "postgres",
            host,
            port,
            database,
            username: user,
            password,
            ssl: { rejectUnauthorized: false },
          },
          options: {
            ssl: false,
          },
        },
      },
    };
  };
} else {
  module.exports = ({ env }) => ({
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host: env("DATABASE_HOST"),
          port: env.int("DATABASE_PORT"),
          database: env("DATABASE_NAME"),
          username: env("DATABASE_USERNAME"),
          password: env("DATABASE_PASSWORD"),
          ssl: env.bool("DATABASE_SSL"),
        },
        options: {},
      },
    },
  });
}
