const express = require('express');
const app = express();

// app.use(require('cors')());
app.use(require('cors')({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/', require('./controllers/redirect'));
app.use('/api/v1/auth', require('./controllers/auth'));
app.use('/api/v1/shorten', require('./controllers/shorten'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
