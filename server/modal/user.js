const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat-app',
});
const createUser = async (username, password) => {
  conn.query('INSERT INTO users (username, password) VALUES (?,?)', [
    username,
    password,
  ]);
};
const hashPassword = async (password, saltRounds) => {
  const res = bcrypt.hashSync(password, saltRounds);
  return res;
};
const isUserExists = async (username) => {
  const res = conn
    .promise()
    .query('SELECT * FROM users WHERE username = ?', [username])
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        return rows[0];
      } else {
        return false;
      }
    });
  return res;
};
async function comparePassswords(passwords, hash) {
  return bcrypt.compareSync(passwords, hash);
}

module.exports = {
  createUser,
  hashPassword,
  isUserExists,
  comparePassswords,
};