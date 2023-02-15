/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const connection = require('../config/database');

exports.createUser = ({
  firstName, lastName, userName, email,
}, password) => new Promise((resolve, reject) => {
  const sql = 'INSERT INTO user VALUES(?, ?, ?, ?, ?, ?)';
  const id = nanoid(16);
  const values = [id, firstName, lastName, userName, email, password];
  connection.query(sql, values, (err, rows) => {
    if (err) {
      reject(err);
    }
    resolve(rows);
  });
});

exports.verifyUser = ({ email, userName }) => new Promise((resolve, reject) => {
  const sql = 'SELECT userName, email FROM user WHERE email = ? && userName = ?';
  const values = [email, userName];
  connection.query(sql, values, (err, rows) => {
    if (err) {
      reject(err);
    }
    resolve(rows);
  });
});

exports.getUserById = ({ userId }) => new Promise((resolve, reject) => {
  const sql = 'SELECT id, firstName, lastName, userName FROM user WHERE id = ?';
  const values = [userId];
  connection.query(sql, values, (err, rows) => {
    if (err) {
      reject(err);
    }
    resolve(rows);
  });
});
