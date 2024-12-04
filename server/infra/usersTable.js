class usersTable {
  init(connection) {
    this.connection = connection;
    this.createTableUsers();
  }

  createTableUsers() {
    const sql = `
      CREATE TABLE IF NOT EXISTS USERS (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        full_name VARCHAR(100) NOT NULL
      );
    `

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Error creating Users table: ", error);
        return;
      } else {
       console.log("Users table created successfully.");
      }
    });
  }
}

module.exports = new usersTable();
