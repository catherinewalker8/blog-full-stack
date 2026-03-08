require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize =  new Sequelize(
      process.env.DB_DATABASE,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
      },
    },
  }
);

module.exports = sequelize;