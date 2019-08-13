const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('../database/db.js');

const app = express();
app.use(express.static(`${__dirname}/../client/dist`));
app.use(cors());
app.use(bodyParser.json());
// get
app.get('/api/cal', (request, response) => {
  // const params = req.params.id;
  const getQuery = 'select * FROM foodlog';
  pool
    .query(getQuery, (error, results) => {
      if (error) {
        console.log(error);
        response.status(404).end();
      } else {
        response.status(200).json(results.rows).end();
      }
    });
});

app.post('/api/cal', (request, response) => {
  console.log(request.body, 'request.body');
  const packet = request.body;
  const params = [];
  for (const property in packet) {
    params.push(packet[property]);
  }
  const insertQuery = `INSERT INTO foodlog(
    dayte,
    meal,
    cal,
    servings,
    totalcal
  ) VALUES($1,$2,$3,$4,$5)`;
  pool.query(insertQuery, params, (error, results) => {
    if (error) {
      response.status(422).end();
    } else {
      response.status(201).json(results.rows).end();
    }
  });
});

app.put('/api/cal', (request, response) => {
  console.log(request.body);
  const params = Object.keys(request.body);
  const updateQuery = `
  UPDATE foodlog
  SET
  dayte = $1,
  meal = $2,
  cal = $3,
  servings = $4,
  totalcal = $5
  WHERE id = $6;`;
  pool.query(updateQuery, params, (error, results) => {
    if (error) {
      console.log(error);
      response.status(422).end();
    } else {
      response.status(201).end();
    }
  });
  response.send('im a put message').status(201);
});


app.delete('/api/cal', (request, response) => {
  // console.log(request);
  console.log(request.body);
  const { id } = request.body;
  console.log(id);
  const deleteQuery = 'DELETE FROM foodlog WHERE id = $1;';
  pool.query(deleteQuery, [id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(400).end();
    }
    response.send(`Deletion successful at ${id}`).status(405).end();
  });
});
module.exports = app;
