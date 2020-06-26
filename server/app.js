require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App run on Port: ${PORT}`);
  });
}

module.exports = app;