const {pool} = require('./database/client');
const indexRouter = require('./routes/index');
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
