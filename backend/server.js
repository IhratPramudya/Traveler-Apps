const express = require('express');
// eslint-disable-next-line import/no-unresolved, import/extensions
const cookieParser = require('cookie-parser');

// connect database
const connection = require('./config/database');

const app = express();
require('dotenv').config();

// eslint-disable-next-line import/order

// userRouter Import
const userRouter = require('./routes/user');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// =============== router user =========
app.use('/user/', userRouter);

connection.connect((err) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log('success');
});

// connect to database and server
app.listen(process.env.PORT, () => {
  console.log('server connect', process.env.PORT);
});
