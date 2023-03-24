/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');
const multer = require('multer');

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
    .catch(() =>
      res.json({
        success: false,
        message: 'An error occurred, please try again later.',
      })
    );
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'server/static/');
  },
  filename(req, file, cb) {
    const { originalname } = file;
    cb(null, originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const result = [];
  fs.createReadStream(`server/static/${req.file.originalname}`)
    .pipe(csvParser())
    .on('data', (data) => {
      result.push(data);
    })
    .on('end', () =>
      console.log('cuccess')
    );
  result.map((i) =>
    knex('users')
      .insert(i)
      .catch(() => {
        res.json({
          success: false,
          message: 'An error occurred, please try again later.',
        });
      }).then(() => {
        knex('users')
          .select('*')
          .then((users) => {
            res.json({ status: 200, data: users });
          })
          .catch(() =>
            res.json({
              success: false,
              message: 'An error occurred, please try again later.',
            })
          );
      })
  );
});

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
