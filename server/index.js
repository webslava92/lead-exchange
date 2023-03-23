/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const fs = require('fs');
// const csvParser = require('csv-parser');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data/db.db3',
  },
  useNullAsDefault: true,
});

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
  ],
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send(`Server started on port ${PORT}`);
});

app.get('/users', (req, res) => {
  knex('users')
    .select('*')
    .then((users) => {
      res.json({ status: 200, data: users });
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        message: 'An error occurred, please try again later.',
      });
    });
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const buffer = req.file.buffer;
  function csvJSON(csv) {
    const lines = csv.split('\n');

    let result;

    const headers = lines[0].split(',');

    lines.map((i) => {
      let json;
      const currentline = lines[i].split(',');

      let obj;
      headers.map((j) => {
        [headers[j]] = currentline[j];
        return result.push(obj);
      });

      return result.push(json);
    });

    return JSON.stringify(result);
  }
  res.send(csvJSON(buffer.toString()));
  // res.send(csvJSON(buffer));

  // const { first_name, last_name, phone, email } = req.body;

  // knex('users')
  //   .insert({ first_name, last_name, phone, email })
  //   .then((id) => {
  //     knex('users')
  //       .select({
  //         id: 'id',
  //         first_name: 'first_name',
  //         last_name: 'last_name',
  //         phone: 'phone',
  //         email: 'email',
  //       })
  //       .where({ id })
  //       .then((user) => res.json(user[0]));
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     return res.json({
  //       success: false,
  //       message: 'An error occurred, please try again later.',
  //     });
  //   });
});

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
