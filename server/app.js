const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const connection = require("./infra/connection");
const usersTable = require("./infra/usersTable");
const routes = require("./routes/index");


app.use(cors());
require('dotenv').config();

routes(app, express);

connection.connect((error) => {
  if (error) {
    console.log("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the db");

  usersTable.init(connection);

  app.listen(port, (error) => {
    if (error) {
      console.log("Error", error);
      return;
    }
    console.log(`App running on port: ${port}`);
  });
});
