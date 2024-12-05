const connection = require("../infra/connection");
const bcrypt = require("bcryptjs");

class usersModel {
  executeQuery(sql, parametros = "") {
    return new Promise((resolve, reject) => {
      connection.query(sql, parametros, (error, answer) => {
        if (error) {
          return reject(error);
        }
        return resolve(answer);
      });
    });
  }

  async createUser(newUser) {
    try {
      const sql = `INSERT INTO USERS (username, full_name)
        VALUES (?, ?); 
      `;

      const params = [
        newUser.username,
        newUser.full_name
      ];

      return this.executeQuery(sql, params);
    } catch (error) {
      console.error("Error creating user: ", error.message);
      throw new Error("Error creating user: " + error.message);
    }
  }

  readUser() {
    const sql = "SELECT * FROM USERS";

    return this.executeQuery(sql);
  }

  deleteUser(id) {
    const sql = `DELETE FROM USERS WHERE id = ? ;`;

    return this.executeQuery(sql, id);
  }

}

module.exports = new usersModel();
