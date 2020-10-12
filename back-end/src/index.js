const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./database/index');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.listen(3333);