'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = process.env.INTERNAL_PORT || 3000;
const HOST = '0.0.0.0';

// App
const app = express();

// cors
const cors = require('cors')

cors();

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Included the routes
app.use('/api', require('./routes')());

// All the unknown request gets Not found error.
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
