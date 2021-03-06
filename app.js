/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
const express = require('express');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const shortUrl = require('./models/shortUrl');

// start express server
const app = express();
const localPort = 5002;

// method override middleware

app.use(methodOverride('_method'));

// connect MongoDB Cloud Atlas database
connectDB();

// express static files (CSS, etc)

app.use(express.static('public'));

// express view engine

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(express.json({ extended: false }));

// define Routes
// app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.get('/', async (req, res) => {
  const shortUrls = await shortUrl.find();
  res.render('index', { shortUrls });
});

app.get('/:ref', async (req, res) => {
  const redirect = await shortUrl.findOne({ short: req.params.ref });
  if (redirect == null) return res.sendStatus(404);

  redirect.clicks++;
  redirect.save();

  res.redirect(redirect.target);
});

app.listen(process.env.PORT || localPort, () => console.log(`Server started on port ${localPort}.`));
