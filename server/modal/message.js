const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat-app',
});

const uploadMessages = async (text, time, username) => {
  console.log(text, time, username);
  conn.query('INSERT INTO messages (text, time, username) VALUES (?,?,?)', [
    text,
    time,
    username,
  ]);
};

const getMessages = async () => {
  const res = conn
    .promise()
    .query('SELECT * FROM messages ')
    .then(([rows, fields]) => {
      return rows;
    });
  return res;
};

module.exports = {
  uploadMessages,
  getMessages,
};
